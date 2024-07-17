import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpDashPage } from './sp-dash.page';

const routes: Routes = [
  {
    path: '',
    component: SpDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpDashPageRoutingModule {}
