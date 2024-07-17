import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpDashPageRoutingModule } from './sp-dash-routing.module';

import { SpDashPage } from './sp-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpDashPageRoutingModule
  ],
  declarations: [SpDashPage]
})
export class SpDashPageModule {}
