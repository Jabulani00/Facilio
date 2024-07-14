import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceRequestsBmPage } from './maintenance-requests-bm.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceRequestsBmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRequestsBmPageRoutingModule {}
