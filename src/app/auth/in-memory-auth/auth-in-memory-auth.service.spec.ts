import { TestBed } from '@angular/core/testing'

import { AuthInMemoryAuthService } from './auth-in-memory-auth.service'

describe('InMemoryAuthService', () => {
  let service: AuthInMemoryAuthService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(AuthInMemoryAuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
