import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BmDashPageRoutingModule } from './bm-dash-routing.module';

import { BmDashPage } from './bm-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BmDashPageRoutingModule
  ],
  declarations: [BmDashPage]
})
export class BmDashPageModule {}
