import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiberarPage } from './liberar.page';

const routes: Routes = [
  {
    path: '',
    component: LiberarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiberarPageRoutingModule {}
