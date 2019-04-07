import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from 'app/home/home-routing.module';
import { DashboardComponent } from 'app/home/dashboard/dashboard.component';
import { MaterialModule } from 'app/material/material.module';
import { HomeComponent } from 'app/home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { KidsListComponent } from './kids-list/kids-list.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { KidComponent } from './kid/kid.component';
import { KendoModule } from 'app/kendo/kendo.module';
import { PresencesComponent } from 'app/home/presences/presences.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    SettingsComponent,
    KidsListComponent,
    AttendanceComponent,
    KidComponent,
    PresencesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    KendoModule
  ],
  exports: [
  ]
})
export class HomeModule { }
