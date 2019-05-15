import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppTokenModule } from './app-token.module';
import { AppRoutingModule } from './app-routing.module';
import { RootStoreModule } from './root-store/root-store.module';
import { AppPrimeNGModule } from './app-primeng.module';
import { AuthGuard } from './app-auth.guard';

import { AppComponent } from './app.component';
import { SigninComponent } from './containers/signin/signin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { ProductsComponent } from './containers/products/products.component';
import { ApplicationsComponent } from './containers/applications/applications.component';
import { SignupComponent } from './containers/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SidebarComponent,
    SidebarItemComponent,
    TopbarComponent,
    FooterComponent,
    DashboardComponent,
    ProductsComponent,
    ApplicationsComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppTokenModule,
    RootStoreModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppPrimeNGModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
