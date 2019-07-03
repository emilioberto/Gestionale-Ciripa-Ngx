import { Injectable } from '@angular/core';
import { Router, NavigationExtras, Params } from '@angular/router';

export enum States {
  Home = 'home',
  Login = 'login',
  NotFound = 'not-found'
}

export enum HomeStates {
  Dashboard = 'dashboard',
  KidsList = 'kids-list',
  NewKid = 'kid',
  Kid = 'kid/:id',
  Attendance = 'attendance',
  Presences = 'presences',
  PresencesByKidMonthYear = 'presences/:kidId/:month/:year',
  Settings = 'settings'
}

@Injectable()
export class NavigationService {

  constructor(
    private router: Router
  ) { }

  public navigateToLogin(): Promise<boolean> {
    return this.router.navigate([States.Login]);
  }

  public navigateToHome(): Promise<boolean> {
    return this.router.navigate([States.Home]);
  }

  public navigateToKidsList(): Promise<boolean> {
    return this.router.navigate([States.Home, HomeStates.KidsList]);
  }

  public navigateToAttendance(): Promise<boolean> {
    return this.router.navigate([States.Home, HomeStates.Attendance]);
  }

  public navigateToSettings(): Promise<boolean> {
    return this.router.navigate([States.Home, HomeStates.Settings]);
  }

  public navigateToKid(kidId: number): Promise<boolean> {
    return this.router.navigate([States.Home, HomeStates.NewKid, kidId]);
  }

  public navigateToNewKid(): Promise<boolean> {
    return this.router.navigate([States.Home, HomeStates.NewKid]);
  }

  public navigateToPresences(): Promise<boolean> {
    return this.router.navigate([States.Home, HomeStates.Presences]);
  }

  public navigateToPresencesSummary(kidId: number, month: number, year: number): Promise<boolean> {
    return this.router.navigate([States.Home, HomeStates.Presences, kidId, month, year]);
  }
}
