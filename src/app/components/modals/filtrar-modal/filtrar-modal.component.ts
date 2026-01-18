import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filtrar-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Filtrar Processos</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="fechar()">
            <ion-icon name="close" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-list-header>
          <ion-label>Prioridade</ion-label>
        </ion-list-header>
        
        <ion-item>
          <ion-checkbox [(ngModel)]="filtros.maxima" labelPlacement="end">
            Máxima
          </ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox [(ngModel)]="filtros.alta" labelPlacement="end">
            Alta
          </ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox [(ngModel)]="filtros.media" labelPlacement="end">
            Média
          </ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox [(ngModel)]="filtros.baixa" labelPlacement="end">
            Baixa
          </ion-checkbox>
        </ion-item>

        <ion-list-header class="ion-margin-top">
          <ion-label>Status</ion-label>
        </ion-list-header>

        <ion-item>
          <ion-checkbox [(ngModel)]="filtros.comNota" labelPlacement="end">
            Com nota
          </ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox [(ngModel)]="filtros.pendenteAssinatura" labelPlacement="end">
            Pendente assinatura
          </ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox [(ngModel)]="filtros.providenciaAberta" labelPlacement="end">
            Providência aberta
          </ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox [(ngModel)]="filtros.comSigilo" labelPlacement="end">
            Com sigilo
          </ion-checkbox>
        </ion-item>

        <ion-list-header class="ion-margin-top">
          <ion-label>Responsável</ion-label>
        </ion-list-header>

        <ion-item>
          <ion-checkbox [(ngModel)]="filtros.somenteResponsavel" labelPlacement="end">
            Somente onde sou responsável
          </ion-checkbox>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button fill="clear" (click)="limpar()">
            Limpar
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button fill="solid" (click)="aplicar()">
            Aplicar Filtros
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  `,
  styles: [`
    ion-list-header {
      font-weight: 600;
      font-size: 1rem;
    }
    ion-footer ion-toolbar {
      padding: 8px;
    }
  `],
  standalone: false
})
export class FiltrarModalComponent {
  filtros = {
    maxima: false,
    alta: false,
    media: false,
    baixa: false,
    comNota: false,
    pendenteAssinatura: false,
    providenciaAberta: false,
    comSigilo: false,
    somenteResponsavel: false
  };

  constructor(private modalCtrl: ModalController) {}

  fechar() {
    this.modalCtrl.dismiss();
  }

  limpar() {
    this.filtros = {
      maxima: false,
      alta: false,
      media: false,
      baixa: false,
      comNota: false,
      pendenteAssinatura: false,
      providenciaAberta: false,
      comSigilo: false,
      somenteResponsavel: false
    };
  }

  aplicar() {
    this.modalCtrl.dismiss(this.filtros);
  }
}
