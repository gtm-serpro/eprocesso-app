import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArquivarPageRoutingModule } from './arquivar-routing.module';

import { ArquivarPage } from './arquivar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArquivarPageRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ArquivarPage]
})
export class ArquivarPageModule {}
