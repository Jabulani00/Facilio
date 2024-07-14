import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceRequestsSpPageRoutingModule } from './maintenance-requests-sp-routing.module';

import { MaintenanceRequestsSpPage } from './maintenance-requests-sp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceRequestsSpPageRoutingModule
  ],
  declarations: [MaintenanceRequestsSpPage]
})
export class MaintenanceRequestsSpPageModule {}
