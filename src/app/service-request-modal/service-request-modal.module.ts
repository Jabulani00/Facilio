import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceRequestModalPageRoutingModule } from './service-request-modal-routing.module';

import { ServiceRequestModalPage } from './service-request-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceRequestModalPageRoutingModule
  ],
  declarations: [ServiceRequestModalPage]
})
export class ServiceRequestModalPageModule {}
