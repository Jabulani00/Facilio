import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardBmPage } from './dashboard-bm.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardBmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardBmPageRoutingModule {}
