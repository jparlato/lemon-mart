import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppMaterialModule } from './app-material.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthHttpInterceptor } from './auth/auth-http-interceptor'
import { AuthService } from './auth/auth.service'
import { AuthInMemoryAuthService } from './auth/in-memory-auth/auth-in-memory-auth.service'
import { SimpleDialogCompnent } from './common/dialogs/simple-dialog.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

// const matmodules = [MatToolbarModule,  MatButtonModule, MatIconModule]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SimpleDialogCompnent,
    PageNotFoundComponent,
    LoginComponent,
    NavigationMenuComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    AppMaterialModule,
    // InventoryModule,
    // PosModule,
    // UserModule,
  ],
  providers: [
    {
      provide: AuthService,
      useClass: AuthInMemoryAuthService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [SimpleDialogCompnent, MatDialogModule],
})
export class AppModule {}
