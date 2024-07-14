import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaintenanceRequestsBmPage } from './maintenance-requests-bm.page';

describe('MaintenanceRequestsBmPage', () => {
  let component: MaintenanceRequestsBmPage;
  let fixture: ComponentFixture<MaintenanceRequestsBmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceRequestsBmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
