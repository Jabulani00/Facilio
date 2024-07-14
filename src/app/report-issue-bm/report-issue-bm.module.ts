import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportIssueBmPageRoutingModule } from './report-issue-bm-routing.module';

import { ReportIssueBmPage } from './report-issue-bm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportIssueBmPageRoutingModule
  ],
  declarations: [ReportIssueBmPage]
})
export class ReportIssueBmPageModule {}
