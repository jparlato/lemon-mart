import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { IUser, User } from '../user/user/user'
import { Role } from './auth.enum'
import { IAuthService } from './interfaces/iauth-service'

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

export interface IServerAutResponse {
  accessToken: string
}

export const defaultAuthstatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
}

@Injectable()
export abstract class AuthService implements IAuthService {
  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthstatus)

  currentUser$ = new BehaviorSubject<IUser>(new User())

  constructor() {}

  login(email: string, password: string): Observable<void> {
    throw new Error('Method not implemented.')
  }
  logout(clearToken?: boolean): void {
    throw new Error('Method not implemented.')
  }
  getToken(): string {
    throw new Error('Method not implemented.')
  }

  protected abstract autProvider(
    email: string,
    password: string
  ): Observable<IServerAutResponse>

  protected abstract transformJwtToken(token: unknown): IAuthStatus

  protected abstract getCurrentUser(): Observable<User>
}
