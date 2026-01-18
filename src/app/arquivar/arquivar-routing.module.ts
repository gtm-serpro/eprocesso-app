import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArquivarPage } from './arquivar.page';

const routes: Routes = [
  {
    path: '',
    component: ArquivarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArquivarPageRoutingModule {}
