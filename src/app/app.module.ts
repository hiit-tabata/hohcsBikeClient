import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';

import { SDKModule } from './shared/sdk/index';

import { AuthModule } from './shared/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
		RouterModule.forRoot(routes),
		LoginModule,
		DashboardModule,
		SharedModule.forRoot(),
    SDKModule.forRoot(),
    AuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
