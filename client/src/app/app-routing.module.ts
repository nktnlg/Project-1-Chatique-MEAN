import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegPageComponent} from "./reg-page/reg-page.component";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {LoggedLayoutComponent} from "./layout/logged-layout/logged-layout.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {ChatPageComponent} from "./chat-page/chat-page.component";
import {AuthGuard} from "./shared/classes/auth.guard";

const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
      {path: 'login', component:LoginPageComponent},
      {path: 'registration', component:RegPageComponent},
    ]},
  {path: '', component: LoggedLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'main', component:MainPageComponent},
      {path: 'profile', component:ProfilePageComponent},
      {path: 'chat', component:ChatPageComponent}
    ]}
  ]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
