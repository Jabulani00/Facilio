import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaintenanceRequestsSpPage } from './maintenance-requests-sp.page';

describe('MaintenanceRequestsSpPage', () => {
  let component: MaintenanceRequestsSpPage;
  let fixture: ComponentFixture<MaintenanceRequestsSpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceRequestsSpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
