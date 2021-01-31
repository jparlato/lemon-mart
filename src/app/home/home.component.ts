import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { combineLatest } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authervice: AuthService, private router: Router) {}

  ngOnInit(): void {}

  /*

This operator is best used when you have multiple, long-lived observables that rely
on each other for some calculation or determination. Basic examples of this
can be seen in example three, where events from multiple buttons are being combined
to produce a count of each and an overall total, or a calculation of BMI from the
 RxJS documentation. Be aware that combineLatest will not emit an initial value
  until each observable emits at least one value.
 This is the same behavior as withLatestFrom and can be a gotcha as there
 will be no output and no error but one (or more) of your inner observables is likely
 not functioning as intended, or a subscription is late.


  */

  login(): void {
    this.authervice.login('manager@test.com', '12345678')
    combineLatest([this.authervice.authStatus$, this.authervice.currentUser$])
      .pipe(
        filter(([authstatus, user]) => authstatus.isAuthenticated && user?._id !== ''),
        tap(([authStatus, user]) => {
          console.log(authStatus.isAuthenticated)
          console.log(user?._id)
          this.router.navigate(['/manager'])
        })
      )
      .subscribe()
  }
}
