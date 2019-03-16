import { Injectable } from '@angular/core';

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
  Presenced = 'presences',
  Settings = 'settings'
}

@Injectable()
export class NavigationService {

  constructor() { }
}
