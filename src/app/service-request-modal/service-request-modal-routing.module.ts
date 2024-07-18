import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceRequestModalPage } from './service-request-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceRequestModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRequestModalPageRoutingModule {}
