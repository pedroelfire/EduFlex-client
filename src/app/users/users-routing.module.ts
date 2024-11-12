import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from '../auth/login-screen/login-screen.component';
import { RegisterScreenComponent } from '../auth/register-screen/register-screen.component';


const routes: Routes = [
  { path: 'login', component: LoginScreenComponent },  
  { path: 'register', component: RegisterScreenComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
