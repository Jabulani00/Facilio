import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardSpPage } from './dashboard-sp.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardSpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardSpPageRoutingModule {}
