import { Injectable } from '@angular/core'
import jwt_decode from 'jwt-decode'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators'

import { transformError } from '../common/common'
import { IUser, User } from '../user/user/user'
import { Role } from './auth.enum'
import { CacheService } from './cache.service'
import { IAuthService } from './interfaces/iauth-service'

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
  expires: Date
}

export interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthstatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
  expires: new Date(),
}

@Injectable()
export abstract class AuthService extends CacheService implements IAuthService {
  // public

  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(
    this.getItem('authStatus') ?? defaultAuthstatus
  )

  currentUser$ = new BehaviorSubject<IUser>(new User())

  // protected

  // private

  constructor() {
    super()
    if (this.hasExpiredToken()) {
      this.logout(true)
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken())
    }
    // this.authStatus$.pipe(tap((authStatus) => this.setItem('authStatus', authStatus)))
  }

  // public methods

  login(email: string, password: string): Observable<void> {
    this.clearToken()

    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value: { accessToken: any }) => {
        this.setToken(value.accessToken) // set token in local storage
        const token = jwt_decode(value.accessToken)
        return this.transformJwtToken(token)
      }),
      tap(() => {
        this.authStatus$.next(this.getAuthStatusFromToken())
      }),
      filter((status: IAuthStatus) => status.isAuthenticated),
      mergeMap(() => this.getCurrentUser()),
      map((user) => this.currentUser$.next(user)),
      catchError(transformError)
    )

    loginResponse$.subscribe({
      error: (err) => {
        this.logout()
        return throwError(err)
      },
    })
    return loginResponse$
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clear()
    }
    setTimeout(() => this.authStatus$.next(defaultAuthstatus), 0)
  }

  // the cache is doing json parse and we don't want to parse a token
  // don't use the cache
  getToken(): string {
    return this.getTokenJwt('jwt') ?? ''
  }

  // protected methods

  // the cache is doing json parse and we don't want to parse a token
  // don't use the cache
  protected getTokenJwt(key: string): string | null {
    return localStorage.getItem(key)
  }

  protected hasExpiredToken(): boolean {
    const jwt = this.getToken()
    if (jwt) {
      const payload = jwt_decode(jwt) as any
      console.log(payload)
      return Date.now() >= payload.exp * 1000
    }
    return true
  }

  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJwtToken(jwt_decode(this.getToken()))
  }

  protected clearToken(): void {
    this.removeItem('jwt')
  }

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>

  protected setToken(jwt: string): void {
    this.setItem('jwt', jwt)
  }

  protected abstract transformJwtToken(token: unknown): IAuthStatus

  protected abstract getCurrentUser(): Observable<User>

  // private methods
}
