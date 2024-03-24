import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import { RegisterComponent } from './components/register/register.component';
import { LoginBizComponent } from './components/login-biz/login-biz.component';
import { RegisterBizComponent } from './components/register-biz/register-biz.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login-biz', component: LoginBizComponent},
  { path: 'register-biz', component: RegisterBizComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
