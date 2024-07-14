import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportIssueSpPageRoutingModule } from './report-issue-sp-routing.module';

import { ReportIssueSpPage } from './report-issue-sp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportIssueSpPageRoutingModule
  ],
  declarations: [ReportIssueSpPage]
})
export class ReportIssueSpPageModule {}
