import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './containers/signin/signin.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { AuthGuard } from './app-auth.guard';

const routes: Routes = [
  { path: 'auth/signin', component: SigninComponent, canActivate: [] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth/signin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
