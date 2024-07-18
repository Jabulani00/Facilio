import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmDashPage } from './bm-dash.page';

describe('BmDashPage', () => {
  let component: BmDashPage;
  let fixture: ComponentFixture<BmDashPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmDashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
