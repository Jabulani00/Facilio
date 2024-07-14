import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskStatusUpdatePage } from './task-status-update.page';

describe('TaskStatusUpdatePage', () => {
  let component: TaskStatusUpdatePage;
  let fixture: ComponentFixture<TaskStatusUpdatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskStatusUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
