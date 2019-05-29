import { TestBed } from '@angular/core/testing';

import { SettingUserManagementService } from './setting-user-management.service';

describe('SettingUserManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingUserManagementService = TestBed.get(SettingUserManagementService);
    expect(service).toBeTruthy();
  });
});
