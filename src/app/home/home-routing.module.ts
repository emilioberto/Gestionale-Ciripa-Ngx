import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from 'app/home/dashboard/dashboard.component';
import { HomeStates } from 'app/core/services/navigation.service';
import { HomeComponent } from 'app/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: HomeStates.Dashboard },
      { path: HomeStates.Dashboard, component: DashboardComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
