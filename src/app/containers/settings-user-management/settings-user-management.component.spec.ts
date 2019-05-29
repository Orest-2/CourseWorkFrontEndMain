import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsUserManagementComponent } from './settings-user-management.component';

describe('SettingsUserManagementComponent', () => {
  let component: SettingsUserManagementComponent;
  let fixture: ComponentFixture<SettingsUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
