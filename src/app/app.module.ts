import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatIconModule } from '@angular/material/icon'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppMaterialModule } from './app-material.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { InventoryModule } from './inventory/inventory.module'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { PosModule } from './pos/pos.module'
import { UserModule } from './user/user.module'

// const matmodules = [MatToolbarModule,  MatButtonModule, MatIconModule]

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    AppMaterialModule,
    // InventoryModule,
    //PosModule,
    // UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
