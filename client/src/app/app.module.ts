import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from './app.component';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {LoggedLayoutComponent} from './layout/logged-layout/logged-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegPageComponent} from './reg-page/reg-page.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {ChatPageComponent} from './chat-page/chat-page.component';
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import { ChatWindowComponent } from './chat-window/chat-window.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    LoggedLayoutComponent,
    LoginPageComponent,
    RegPageComponent,
    MainPageComponent,
    ProfilePageComponent,
    ChatPageComponent,
    ChatWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
