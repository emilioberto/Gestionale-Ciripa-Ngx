import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { KendoModule } from 'app/kendo/kendo.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SettingsService } from 'app/shared/services/settings.service';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { Settings } from 'app/shared/models/settings.model';
import { By } from '@angular/platform-browser';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let settingsService: SettingsService;
  let debugElement: DebugElement;
  let getSettingsSpy: any;

  const mockSettings: Settings = <Settings>{
    hourCost: 10.68,
    id: '1'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        KendoModule,
        HttpClientTestingModule
      ],
      declarations: [SettingsComponent],
      providers: [
        SettingsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    settingsService = debugElement.injector.get(SettingsService);
    getSettingsSpy = spyOn(settingsService, 'getSettings').and.returnValue(of(mockSettings));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('settings should be defined', () => {
    expect(component.settings).toBeDefined();
  });

  it('should get and set correct settings', async () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.settings.hourCost).toBe(10.68);
      expect(component.settings.id).toBe('1');
    });
  });

  it('should have kendo-numeric-textbox', async () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const hourCostTextBox = debugElement.query(By.css('kendo-numerictextbox'));
      expect(hourCostTextBox).toBeTruthy();
    });
  });

  it('should set correct value on textbox', async () => {
    const hourCostTextBox = debugElement.query(By.css('kendo-numerictextbox'));
    const textboxElement = hourCostTextBox.nativeElement.querySelector('input');
    expect(textboxElement).toBeTruthy();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(textboxElement.value).toBe('$10.68');
    });
  });
});
