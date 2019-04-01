import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from 'app/login/login.component';
import { LoginRoutingModule } from 'app/login/login-routing.module';
import { MaterialModule } from 'app/material/material.module';
import { KendoModule } from 'app/kendo/kendo.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    KendoModule
  ]
})
export class LoginModule { }
