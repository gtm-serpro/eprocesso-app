import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovimentarPageRoutingModule } from './movimentar-routing.module';

import { MovimentarPage } from './movimentar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovimentarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MovimentarPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovimentarPageModule {}
