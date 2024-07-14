import { TestBed } from '@angular/core/testing';

import { TaskStatusUpdateService } from './task-status-update.service';

describe('TaskStatusUpdateService', () => {
  let service: TaskStatusUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStatusUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
