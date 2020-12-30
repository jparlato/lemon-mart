import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { MaterialModule } from '../material.module'
import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { ManagerRoutingModule } from './manager-routing.module'
import { ManagerComponent } from './manager.component'
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component'
import { UserManagementComponent } from './user-management/user-management.component'

// import { Routes } from '@angular/router'

// export const managerModuleRoutes: Routes = [
//   {
//     path: '',
//     component: ManagerHomeComponent,
//   },
// ]
@NgModule({
  declarations: [
    ManagerHomeComponent,
    ManagerComponent,
    UserManagementComponent,
    ReceiptLookupComponent,
  ],
  imports: [CommonModule, MaterialModule, ManagerRoutingModule],
  schemas: [],
})
export class ManagerModule {}
