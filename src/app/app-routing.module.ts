import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { LoginComponent } from './login/login.component';
import { MensagemComponent } from './mensagem/mensagem.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "messages",
    component: MensagemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**", redirectTo: "/login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
