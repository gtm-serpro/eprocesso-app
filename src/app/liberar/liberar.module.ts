import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiberarPageRoutingModule } from './liberar-routing.module';

import { LiberarPage } from './liberar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiberarPageRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [LiberarPage]
})
export class LiberarPageModule {}
