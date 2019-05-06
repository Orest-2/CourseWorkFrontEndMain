import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './containers/signin/signin.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { AuthGuard } from './app-auth.guard';
import { ProductsComponent } from './containers/products/products.component';
import { ApplicationsComponent } from './containers/applications/applications.component';

const routes: Routes = [
  { path: 'auth/signin', component: SigninComponent, canActivate: [] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth/signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
