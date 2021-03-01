import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AppMaterialModule } from '../app-material.module'
import { LogoutComponent } from './logout/logout.component'
import { ProfileComponent } from './profile/profile.component'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [ProfileComponent, LogoutComponent],
  imports: [CommonModule, AppMaterialModule, UserRoutingModule],
})
export class UserModule {}
