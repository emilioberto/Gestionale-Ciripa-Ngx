import { Component, OnInit } from '@angular/core';

import { NavigationService } from 'app/core/services/navigation.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { BaseComponent } from 'app/shared/components/base.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(
    private navigationService: NavigationService,
    private authenticationService: AuthenticationService,
    snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  ngOnInit() {
    if (localStorage.getItem('accessToken')) {
      this.navigationService.navigateToHome();
    }
  }

  public login(): void {
    const credentials = { username: this.username, password: this.password };
    this.authenticationService.login(credentials).subscribe(
      res => {
        localStorage.setItem('accessToken', res.accessToken);
        this.navigationService.navigateToHome();
      },
      err => this.addErrorNotification('Username o password non validi.', 'OK')
    );
  }
}
