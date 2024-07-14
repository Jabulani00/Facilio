import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportIssueBmPage } from './report-issue-bm.page';

const routes: Routes = [
  {
    path: '',
    component: ReportIssueBmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportIssueBmPageRoutingModule {}
