import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportIssueSpPage } from './report-issue-sp.page';

const routes: Routes = [
  {
    path: '',
    component: ReportIssueSpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportIssueSpPageRoutingModule {}
