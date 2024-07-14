import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportIssueBmPage } from './report-issue-bm.page';

describe('ReportIssueBmPage', () => {
  let component: ReportIssueBmPage;
  let fixture: ComponentFixture<ReportIssueBmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIssueBmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
