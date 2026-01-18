import { Component } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { FiltrarModalComponent } from '../modals/filtrar-modal/filtrar-modal.component';
import { PesquisaGeralModalComponent } from '../modals/pesquisa-geral-modal/pesquisa-geral-modal.component';
import { HorasEstimadasModalComponent } from '../modals/horas-estimadas-modal/horas-estimadas-modal.component';

@Component({
  selector: 'app-menu-popover',
  template: `
    <ion-list>
      <ion-item button (click)="abrirFiltrar()" detail="false">
        <ion-icon name="filter-outline" slot="start"></ion-icon>
        <ion-label>Filtrar</ion-label>
      </ion-item>
      <ion-item button (click)="abrirPesquisaGeral()" detail="false">
        <ion-icon name="search-outline" slot="start"></ion-icon>
        <ion-label>Pesquisa geral</ion-label>
      </ion-item>
      <ion-item button (click)="abrirHorasEstimadas()" detail="false">
        <ion-icon name="time-outline" slot="start"></ion-icon>
        <ion-label>Total de horas estimadas</ion-label>
      </ion-item>
    </ion-list>
  `,
  styles: [`
    ion-list {
      padding: 0;
    }
    ion-item {
      --padding-start: 16px;
      --padding-end: 16px;
      --min-height: 48px;
    }
    ion-icon {
      margin-right: 12px;
    }
  `],
  standalone: false
})
export class MenuPopoverComponent {
  constructor(
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController
  ) {}

  async abrirFiltrar() {
    await this.popoverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: FiltrarModalComponent
    });
    await modal.present();
  }

  async abrirPesquisaGeral() {
    await this.popoverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: PesquisaGeralModalComponent
    });
    await modal.present();
  }

  async abrirHorasEstimadas() {
    await this.popoverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: HorasEstimadasModalComponent
    });
    await modal.present();
  }
}
