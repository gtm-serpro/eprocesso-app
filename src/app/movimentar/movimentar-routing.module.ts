import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovimentarPage } from './movimentar.page';

const routes: Routes = [
  {
    path: '',
    component: MovimentarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimentarPageRoutingModule {}
