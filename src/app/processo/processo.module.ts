import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProcessoComponent } from './processo.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule ],
  declarations: [ProcessoComponent],
  exports: [ProcessoComponent]
})
export class ProcessoComponentModule {}
