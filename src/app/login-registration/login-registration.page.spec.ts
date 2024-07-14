import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRegistrationPage } from './login-registration.page';

describe('LoginRegistrationPage', () => {
  let component: LoginRegistrationPage;
  let fixture: ComponentFixture<LoginRegistrationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
