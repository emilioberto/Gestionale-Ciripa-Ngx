import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from 'app/home/dashboard/dashboard.component';
import { HomeStates } from 'app/core/services/navigation.service';

const routes: Routes = [
  { path: '', redirectTo: HomeStates.Dashboard, pathMatch: 'full' },
  { path: HomeStates.Dashboard, component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
