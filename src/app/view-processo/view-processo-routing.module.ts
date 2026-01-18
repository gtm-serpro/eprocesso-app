import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProcessoPage } from './view-processo.page';

const routes: Routes = [
  {
    path: ':id',
    component: ViewProcessoPage,
    // resolve: { processo: ProcessoResolver }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProcessoPageRoutingModule {}
