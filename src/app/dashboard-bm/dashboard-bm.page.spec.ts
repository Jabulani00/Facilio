import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardBmPage } from './dashboard-bm.page';

describe('DashboardBmPage', () => {
  let component: DashboardBmPage;
  let fixture: ComponentFixture<DashboardBmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
