import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskStatusUpdatePage } from './task-status-update.page';

const routes: Routes = [
  {
    path: '',
    component: TaskStatusUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskStatusUpdatePageRoutingModule {}
