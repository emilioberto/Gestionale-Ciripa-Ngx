import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from 'app/home/home-routing.module';
import { DashboardComponent } from 'app/home/dashboard/dashboard.component';
import { MaterialModule } from 'app/material/material.module';
import { HomeComponent } from 'app/home/home.component';

@NgModule({
  declarations: [DashboardComponent, HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
  ]
})
export class HomeModule { }
