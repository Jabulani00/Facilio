import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportIssueSpPage } from './report-issue-sp.page';

describe('ReportIssueSpPage', () => {
  let component: ReportIssueSpPage;
  let fixture: ComponentFixture<ReportIssueSpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIssueSpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
