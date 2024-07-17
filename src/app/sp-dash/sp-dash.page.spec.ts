import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpDashPage } from './sp-dash.page';

describe('SpDashPage', () => {
  let component: SpDashPage;
  let fixture: ComponentFixture<SpDashPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpDashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
