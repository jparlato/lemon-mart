import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { ManagerRoutingModule } from './manager-routing.module'

// import { Routes } from '@angular/router'

// export const managerModuleRoutes: Routes = [
//   {
//     path: '',
//     component: ManagerHomeComponent,
//   },
// ]
@NgModule({
  declarations: [ManagerHomeComponent],
  imports: [CommonModule, ManagerRoutingModule],
})
export class ManagerModule {}
