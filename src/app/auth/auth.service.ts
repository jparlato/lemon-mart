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
}

export interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthstatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
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
    this.authStatus$.pipe(tap((authStatus) => this.setItem('authStatus', authStatus)))
  }

  // public methods

  login(email: string, password: string): Observable<void> {
    this.clearToken()

    const loginResponse$ = this.autProvider(email, password).pipe(
      map((value: { accessToken: any }) => {
        this.setToken(value.accessToken) // set token in local storage
        const token = jwt_decode(value.accessToken)
        return this.transformJwtToken(token)
      }),
      tap((status: IAuthStatus) => this.authStatus$.next(status)),
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
  getToken(): string {
    return this.getItem('jwt') ?? ''
  }

  // protected methods

  protected clearToken(): void {
    this.removeItem('jwt')
  }

  protected abstract autProvider(
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
