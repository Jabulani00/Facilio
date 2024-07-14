import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardSpPage } from './dashboard-sp.page';

describe('DashboardSpPage', () => {
  let component: DashboardSpPage;
  let fixture: ComponentFixture<DashboardSpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
