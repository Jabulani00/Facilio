import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceRequestModalPage } from './service-request-modal.page';

describe('ServiceRequestModalPage', () => {
  let component: ServiceRequestModalPage;
  let fixture: ComponentFixture<ServiceRequestModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
