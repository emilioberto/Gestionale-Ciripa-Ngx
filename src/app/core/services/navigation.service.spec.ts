import { TestBed, inject } from '@angular/core/testing';

import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;
  let location: Location;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ],
    providers: [
      NavigationService,
      { provide: Router, useValue: mockRouter },
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(NavigationService);
    location = TestBed.get(Location);
  });

  afterEach(() => {
    service = null;
    location = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to home', async () => {
    await service.navigateToHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should navigate to kids list', async () => {
    await service.navigateToKidsList();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home', 'kids-list']);
  });

  it('should navigate to new kid', async () => {
    await service.navigateToNewKid();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home', 'kid']);
  });

  it('should navigate to presences', async () => {
    await service.navigateToPresences();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home', 'presences']);
  });

  it('should navigate to settings', async () => {
    await service.navigateToSettings();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home', 'settings']);
  });

  it('should navigate to attendance', async () => {
    await service.navigateToAttendance();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home', 'attendance']);
  });

  it('should navigate to presence summary', async () => {
    await service.navigateToPresencesSummary(1, 10, 2019);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home', 'presences', 1, 10, 2019]);
  });

  it('should navigate to kid details', async () => {
    await service.navigateToKid(23);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home', 'kid', 23]);
  });

});
