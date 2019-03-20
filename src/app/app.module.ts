import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppTokenModule } from './app-token.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootStoreModule } from './root-store/root-store.module';
import { SigninComponent } from './containers/signin/signin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { AuthGuard } from './app-auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SidebarComponent,
    SidebarItemComponent,
    TopbarComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppTokenModule,
    RootStoreModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
