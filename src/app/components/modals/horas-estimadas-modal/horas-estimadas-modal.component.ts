import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../../services/data.service';
import { Processo } from '../../../services/models/processo.model';


interface CategoriaHoras {
  titulo: string;
  subtitulo: string;
  quantidade: number;
  horas: string;
  icone: string;
  cor: string;
}

@Component({
  selector: 'app-horas-estimadas-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Total de Horas Estimadas</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="fechar()">
            <ion-icon name="close" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="categorias-container">
        @for (categoria of categorias; track categoria.titulo) {
          <ion-card [class]="'categoria-card ' + categoria.cor">
            <ion-card-header>
              <div class="card-header-content">
                <ion-icon [name]="categoria.icone" [color]="categoria.cor"></ion-icon>
                <div class="header-text">
                  <ion-card-title>{{ categoria.titulo }}</ion-card-title>
                  <ion-card-subtitle>{{ categoria.subtitulo }}</ion-card-subtitle>
                </div>
              </div>
            </ion-card-header>
            
            <ion-card-content>
              <div class="stats-row">
                <div class="stat-item">
                  <div class="stat-label">Quantidade</div>
                  <div class="stat-value">{{ categoria.quantidade }} processos</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                  <div class="stat-label">Horas Estimadas</div>
                  <div class="stat-value highlight">{{ categoria.horas }} horas</div>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
        }
      </div>

      <ion-card class="resumo-card">
        <ion-card-content>
          <div class="resumo-content">
            <div class="resumo-item">
              <ion-icon name="folder-open-outline" color="primary"></ion-icon>
              <div>
                <div class="resumo-label">Total de Processos</div>
                <div class="resumo-value">{{ totalProcessos }}</div>
              </div>
            </div>
            <div class="resumo-item">
              <ion-icon name="time-outline" color="primary"></ion-icon>
              <div>
                <div class="resumo-label">Total de Horas</div>
                <div class="resumo-value">{{ totalHoras }}</div>
              </div>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-list class="ion-margin-top">
        <ion-list-header>
          <ion-label>Estimativas de Conclusão</ion-label>
        </ion-list-header>

        <ion-item>
          <ion-icon name="sunny-outline" slot="start" color="warning"></ion-icon>
          <ion-label>
            <h3>Trabalhando 8h/dia</h3>
            <p>{{ calcularDias(totalHorasDecimal, 8) }} dias úteis</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-icon name="partly-sunny-outline" slot="start" color="warning"></ion-icon>
          <ion-label>
            <h3>Trabalhando 6h/dia</h3>
            <p>{{ calcularDias(totalHorasDecimal, 6) }} dias úteis</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-icon name="cloudy-outline" slot="start" color="medium"></ion-icon>
          <ion-label>
            <h3>Trabalhando 4h/dia</h3>
            <p>{{ calcularDias(totalHorasDecimal, 4) }} dias úteis</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-card class="info-card ion-margin-top">
        <ion-card-content>
          <ion-icon name="information-circle-outline" color="primary"></ion-icon>
          <div>
            <p>
              As estimativas são baseadas em tempos médios por tipo de processo. 
              Os valores podem variar conforme a complexidade individual de cada caso.
            </p>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [`
    .categorias-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 16px;
    }

    .categoria-card {
      margin: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .categoria-card.primary {
      border-left: 4px solid var(--ion-color-primary);
    }

    .categoria-card.danger {
      border-left: 4px solid var(--ion-color-danger);
    }

    .card-header-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .card-header-content ion-icon {
      font-size: 32px;
    }

    .header-text {
      flex: 1;
    }

    ion-card-title {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 4px;
    }

    ion-card-subtitle {
      font-size: 0.875rem;
      margin-top: 0;
    }

    .stats-row {
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 16px;
      padding: 8px 0;
    }

    .stat-item {
      flex: 1;
      text-align: center;
    }

    .stat-divider {
      width: 1px;
      height: 40px;
      background: var(--ion-color-light-shade);
    }

    .stat-label {
      font-size: 0.75rem;
      color: var(--ion-color-medium);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--ion-color-dark);
    }

    .stat-value.highlight {
      color: var(--ion-color-primary);
      font-size: 1.25rem;
    }

    .resumo-card {
      background: linear-gradient(135deg, var(--ion-color-primary-tint) 0%, var(--ion-color-primary) 100%);
      color: white;
    }

    .resumo-content {
      display: flex;
      justify-content: space-around;
      gap: 24px;
    }

    .resumo-item {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .resumo-item ion-icon {
      font-size: 32px;
      --ionicon-stroke-width: 32px;
      filter: brightness(0) invert(1);
    }

    .resumo-label {
      font-size: 0.75rem;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .resumo-value {
      font-size: 1.5rem;
      font-weight: bold;
    }

    ion-list-header {
      font-weight: 600;
      font-size: 1rem;
      padding-top: 8px;
    }

    ion-item h3 {
      font-weight: 600;
      margin: 0;
    }

    ion-item p {
      margin: 4px 0 0;
      font-size: 0.875rem;
    }

    .info-card {
      background: var(--ion-color-light);
      margin-bottom: 0;
    }

    .info-card ion-card-content {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .info-card ion-icon {
      font-size: 24px;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .info-card p {
      margin: 0;
      font-size: 0.875rem;
      color: var(--ion-color-medium);
      line-height: 1.5;
    }
  `],
  standalone: false
})
export class HorasEstimadasModalComponent implements OnInit {
  categorias: CategoriaHoras[] = [];
  totalProcessos = 0;
  totalHoras = '';
  totalHorasDecimal = 0;

  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.calcularHoras();
  }

  private calcularHoras() {
    const processos = this.dataService.getProcessos();
    
    // Categoria 1: Processos distribuídos para você
    const processosDistribuidos = processos.filter(p => p.ehResponsavelProcesso);
    const horasDistribuidos = this.calcularHorasEstimadas(processosDistribuidos);
    
    // Categoria 2: Processos apenas com documento para assinar
    const processosParaAssinar = processos.filter(p => 
      p.indicadorPendenteAssinatura && !p.indicadorProvidenciaAberta
    );
    const horasParaAssinar = this.calcularHorasEstimadas(processosParaAssinar);

    this.categorias = [
      {
        titulo: 'PROCESSOS DISTRIBUÍDOS PARA VOCÊ',
        subtitulo: 'Processos sob sua responsabilidade',
        quantidade: processosDistribuidos.length,
        horas: this.formatarHoras(horasDistribuidos),
        icone: 'folder-open-outline',
        cor: 'primary'
      },
      {
        titulo: 'PROCESSOS APENAS COM DOCUMENTO PARA VOCÊ ASSINAR',
        subtitulo: 'Documentos pendentes de assinatura',
        quantidade: processosParaAssinar.length,
        horas: this.formatarHoras(horasParaAssinar),
        icone: 'create-outline',
        cor: 'danger'
      }
    ];

    // Totais
    this.totalProcessos = processosDistribuidos.length + processosParaAssinar.length;
    this.totalHorasDecimal = horasDistribuidos + horasParaAssinar;
    this.totalHoras = this.formatarHoras(this.totalHorasDecimal);
  }

  private calcularHorasEstimadas(processos: Processo[]): number {
    // Regras de estimativa (ajuste conforme necessário):
    // - Máxima: 4 horas
    // - Alta: 3 horas
    // - Média: 2 horas
    // - Baixa: 1 hora
    // - Com assinatura pendente: +0.5 hora
    // - Com providência aberta: +1 hora
    
    return processos.reduce((total, p) => {
      let horas = 0;
      
      // Base por prioridade
      switch (p.prioridade) {
        case 'MÁXIMA':
          horas = 4;
          break;
        case 'ALTA':
          horas = 3;
          break;
        case 'MÉDIA':
          horas = 2;
          break;
        case 'BAIXA':
          horas = 1;
          break;
      }
      
      // Adiciona tempo para assinatura
      if (p.indicadorPendenteAssinatura) {
        horas += 0.5;
      }
      
      // Adiciona tempo para providência
      if (p.indicadorProvidenciaAberta) {
        horas += 1;
      }
      
      return total + horas;
    }, 0);
  }

  private formatarHoras(horasDecimal: number): string {
    const horas = Math.floor(horasDecimal);
    const minutos = Math.round((horasDecimal - horas) * 60);
    return `${horas}:${minutos.toString().padStart(2, '0')}`;
  }

  calcularDias(horas: number, horasPorDia: number): string {
    const dias = Math.ceil(horas / horasPorDia);
    return `${dias} ${dias === 1 ? 'dia' : 'dias'}`;
  }

  fechar() {
    this.modalCtrl.dismiss();
  }
}
