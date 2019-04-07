import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from 'app/home/dashboard/dashboard.component';
import { HomeStates } from 'app/core/services/navigation.service';
import { HomeComponent } from 'app/home/home.component';
import { SettingsComponent } from 'app/home/settings/settings.component';
import { KidsListComponent } from 'app/home/kids-list/kids-list.component';
import { AttendanceComponent } from 'app/home/attendance/attendance.component';
import { KidComponent } from 'app/home/kid/kid.component';
import { PresencesComponent } from 'app/home/presences/presences.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: HomeStates.KidsList },
      { path: HomeStates.Dashboard, component: DashboardComponent },
      { path: HomeStates.KidsList, component: KidsListComponent },
      { path: HomeStates.Kid, component: KidComponent },
      { path: HomeStates.NewKid, component: KidComponent },
      { path: HomeStates.Attendance, component: AttendanceComponent },
      { path: HomeStates.Settings, component: SettingsComponent },
      { path: HomeStates.Presences, component: PresencesComponent },
      { path: HomeStates.PresencesByKidMonthYear, component: PresencesComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
