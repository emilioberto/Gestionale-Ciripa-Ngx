import { Component, OnInit } from '@angular/core';

import { NavigationService } from 'app/core/services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(
    private navigationSvc: NavigationService
  ) { }

  ngOnInit() {
  }

  public login(): void {
    this.navigationSvc.navigateToHome();
  }

}
