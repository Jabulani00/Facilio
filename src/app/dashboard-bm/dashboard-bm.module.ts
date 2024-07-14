import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardBmPageRoutingModule } from './dashboard-bm-routing.module';

import { DashboardBmPage } from './dashboard-bm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardBmPageRoutingModule
  ],
  declarations: [DashboardBmPage]
})
export class DashboardBmPageModule {}
