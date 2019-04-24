import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { States } from 'app/core/services/navigation.service';

export const routes: Routes = [
  { path: '', redirectTo: States.Login, pathMatch: 'full' },
  { path: States.Home, loadChildren: 'app/home/home.module#HomeModule' },
  { path: States.Login, loadChildren: 'app/login/login.module#LoginModule' },
  { path: States.NotFound, loadChildren: 'app/not-found/not-found.module#NotFoundModule' },
  { path: '**', redirectTo: States.NotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
