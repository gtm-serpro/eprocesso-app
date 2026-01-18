import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MenuPopoverComponent } from './menu-popover/menu-popover.component';
import { FiltrarModalComponent } from './modals/filtrar-modal/filtrar-modal.component';
import { PesquisaGeralModalComponent } from './modals/pesquisa-geral-modal/pesquisa-geral-modal.component';
import { HorasEstimadasModalComponent } from './modals/horas-estimadas-modal/horas-estimadas-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    MenuPopoverComponent,
    FiltrarModalComponent,
    PesquisaGeralModalComponent,
    HorasEstimadasModalComponent
  ],
  exports: [
    MenuPopoverComponent,
    FiltrarModalComponent,
    PesquisaGeralModalComponent,
    HorasEstimadasModalComponent
  ]
})
export class ComponentsModule {}
