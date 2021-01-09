import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppMaterialModule } from '../app-material.module'
import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { ManagerMaterialModule } from './manager-material.module'
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
  imports: [
    CommonModule,
    AppMaterialModule,
    ManagerMaterialModule,
    FlexLayoutModule,
    ManagerRoutingModule,
  ],
  schemas: [],
})
export class ManagerModule {}
