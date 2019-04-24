import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { KendoModule } from 'app/kendo/kendo.module';
import { HomeComponent } from 'app/home/home.component';
import { MaterialModule } from 'app/material/material.module';
import { NavigationService } from 'app/core/services/navigation.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  class RouterStub { }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        KendoModule,
        MaterialModule
      ],
      providers: [
        NavigationService,
        { provide: Router, useClass: RouterStub }
      ],
      declarations: [LoginComponent, HomeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have a password property', () => {
  //   expect(component.password).toBeTruthy();
  // });

  // it('should generate an username property', () => {
  //   expect(component.username).toBeDefined();
  // });
});
