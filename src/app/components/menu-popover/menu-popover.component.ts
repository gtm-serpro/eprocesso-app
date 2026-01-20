import { Component, Input } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { FiltrarModalComponent } from '../modals/filtrar-modal/filtrar-modal.component';
import { PesquisaGeralModalComponent } from '../modals/pesquisa-geral-modal/pesquisa-geral-modal.component';
import { HorasEstimadasModalComponent } from '../modals/horas-estimadas-modal/horas-estimadas-modal.component';

@Component({
  selector: 'app-menu-popover',
  template: `
    <ion-list>
      @if (modoSelecao) {
        <!-- Opções para modo de seleção múltipla -->
        <ion-item button (click)="executarAcao('liberar')" detail="false">
          <ion-icon name="lock-open" slot="start" color="success"></ion-icon>
          <ion-label>Liberar ({{ quantidadeSelecionados }})</ion-label>
        </ion-item>
        <ion-item button (click)="executarAcao('movimentar')" detail="false">
          <ion-icon name="arrow-forward" slot="start" color="primary"></ion-icon>
          <ion-label>Movimentar ({{ quantidadeSelecionados }})</ion-label>
        </ion-item>
        <ion-item button (click)="executarAcao('arquivar')" detail="false">
          <ion-icon name="archive" slot="start" color="danger"></ion-icon>
          <ion-label>Arquivar ({{ quantidadeSelecionados }})</ion-label>
        </ion-item>
      } @else {
        <!-- Opções normais -->
        <ion-item button (click)="executarAcao('ativar-selecao')" detail="false">
          <ion-icon name="checkbox-outline" slot="start"></ion-icon>
          <ion-label>Seleção múltipla</ion-label>
        </ion-item>
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
      }
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
  @Input() modoSelecao = false;
  @Input() quantidadeSelecionados = 0;

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

  async executarAcao(acao: 'liberar' | 'movimentar' | 'arquivar' | 'ativar-selecao') {
    await this.popoverCtrl.dismiss({ acao });
  }
}