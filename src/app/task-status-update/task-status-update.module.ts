import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskStatusUpdatePageRoutingModule } from './task-status-update-routing.module';

import { TaskStatusUpdatePage } from './task-status-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskStatusUpdatePageRoutingModule
  ],
  declarations: [TaskStatusUpdatePage]
})
export class TaskStatusUpdatePageModule {}
