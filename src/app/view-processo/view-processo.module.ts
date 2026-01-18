import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ViewProcessoPage } from './view-processo.page';
import { ViewProcessoPageRoutingModule } from './view-processo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ViewProcessoPageRoutingModule,
    ViewProcessoPage,
    IonicModule
  ]
})
export class ViewProcessoPageModule {}
