import { Component, OnInit } from '@angular/core';

import { NavigationService } from 'app/core/services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
  }

  public navigateToKidsList(): void {
    this.navigationService.navigateToKidsList();
  }

  public navigateToAttendance(): void {
    this.navigationService.navigateToAttendance();
  }

  public navigateToSettings(): void {
    this.navigationService.navigateToSettings();
  }

  public navigateToPresences(): void {
    this.navigationService.navigateToPresences();
  }
}
