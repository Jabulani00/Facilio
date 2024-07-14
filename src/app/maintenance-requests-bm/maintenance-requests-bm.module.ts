import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceRequestsBmPageRoutingModule } from './maintenance-requests-bm-routing.module';

import { MaintenanceRequestsBmPage } from './maintenance-requests-bm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceRequestsBmPageRoutingModule
  ],
  declarations: [MaintenanceRequestsBmPage]
})
export class MaintenanceRequestsBmPageModule {}
