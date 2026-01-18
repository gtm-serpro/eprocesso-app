import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pesquisa-geral-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Pesquisa Geral</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="fechar()">
            <ion-icon name="close" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-searchbar
        [(ngModel)]="termoPesquisa"
        placeholder="Buscar por número, interessado, CPF..."
        (ionInput)="pesquisar()"
        debounce="500"
      ></ion-searchbar>

      <ion-list>
        <ion-list-header>
          <ion-label>Campos de busca</ion-label>
        </ion-list-header>

        <ion-item>
          <ion-checkbox [(ngModel)]="campos.numero" labelPlacement="end">
            Número do processo
          </ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox [(ngModel)]="campos.interessado" labelPlacement="end">
            Nome do interessado
          </ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox [(ngModel)]="campos.cpf" labelPlacement="end">
            CPF/CNPJ
          </ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox [(ngModel)]="campos.dataProtocolo" labelPlacement="end">
            Data de protocolo
          </ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox [(ngModel)]="campos.dataDistribuicao" labelPlacement="end">
            Data de distribuição
          </ion-checkbox>
        </ion-item>
      </ion-list>

      @if (resultados.length > 0) {
        <ion-list class="ion-margin-top">
          <ion-list-header>
            <ion-label>Resultados ({{ resultados.length }})</ion-label>
          </ion-list-header>
          
          @for (resultado of resultados; track resultado.id) {
            <ion-item button (click)="selecionarResultado(resultado)">
              <ion-label>
                <h2>{{ resultado.numeroFormatado }}</h2>
                <p>{{ resultado.nomeInteressado }}</p>
              </ion-label>
            </ion-item>
          }
        </ion-list>
      }

      @if (termoPesquisa && resultados.length === 0) {
        <div class="sem-resultados">
          <ion-icon name="search-outline" size="large"></ion-icon>
          <p>Nenhum resultado encontrado</p>
        </div>
      }
    </ion-content>
  `,
  styles: [`
    ion-searchbar {
      --background: var(--ion-color-light);
      margin-bottom: 16px;
    }
    
    ion-list-header {
      font-weight: 600;
      font-size: 1rem;
    }

    .sem-resultados {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 16px;
      text-align: center;
      color: var(--ion-color-medium);
    }

    .sem-resultados ion-icon {
      margin-bottom: 16px;
      opacity: 0.5;
    }
  `],
  standalone: false
})
export class PesquisaGeralModalComponent {
  termoPesquisa = '';
  resultados: any[] = [];

  campos = {
    numero: true,
    interessado: true,
    cpf: true,
    dataProtocolo: false,
    dataDistribuicao: false
  };

  constructor(private modalCtrl: ModalController) {}

  fechar() {
    this.modalCtrl.dismiss();
  }

  pesquisar() {
    // Aqui você implementaria a lógica de pesquisa real
    // Por enquanto, array vazio
    this.resultados = [];
    console.log('Pesquisando:', this.termoPesquisa);
  }

  selecionarResultado(resultado: any) {
    this.modalCtrl.dismiss(resultado);
  }
}
