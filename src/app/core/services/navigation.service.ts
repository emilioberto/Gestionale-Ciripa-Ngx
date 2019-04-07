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

  public navigateToHome(): void {
    this.router.navigate([States.Home]);
  }

  public navigateToKidsList(): void {
    this.router.navigate([States.Home, HomeStates.KidsList]);
  }

  public navigateToAttendance(): void {
    this.router.navigate([States.Home, HomeStates.Attendance]);
  }

  public navigateToSettings(): void {
    this.router.navigate([States.Home, HomeStates.Settings]);
  }

  public navigateToKid(kidId: number): void {
    this.router.navigate([States.Home, HomeStates.NewKid, kidId]);
  }

  public navigateToNewKid(): void {
    this.router.navigate([States.Home, HomeStates.NewKid]);
  }

  public navigateToPresencesSummary(kidId: number, month: number, year: number): void {
    this.router.navigate([States.Home, HomeStates.Presences, kidId, month, year]);
  }
}
