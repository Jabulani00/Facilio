import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardSpPageRoutingModule } from './dashboard-sp-routing.module';

import { DashboardSpPage } from './dashboard-sp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardSpPageRoutingModule
  ],
  declarations: [DashboardSpPage]
})
export class DashboardSpPageModule {}
