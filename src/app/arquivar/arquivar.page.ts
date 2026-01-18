import { Component, OnInit } from '@angular/core';
import { Processo, PrioridadeProcesso } from '../services/models/processo.model';

@Component({
  selector: 'app-arquivar',
  templateUrl: './arquivar.page.html',
  styleUrls: ['./arquivar.page.scss'],
  standalone:false
})
export class ArquivarPage implements OnInit {
  processo?: Processo;

  constructor() { }

  ngOnInit() {
    
  }
  getHeaderColor(): string {
      if (!this.processo) return 'primary';
      
      const colorMap: Record<PrioridadeProcesso, string> = {
        [PrioridadeProcesso.MAXIMA]: 'danger',
        [PrioridadeProcesso.ALTA]: 'warning',
        [PrioridadeProcesso.MEDIA]: 'primary',
        [PrioridadeProcesso.BAIXA]: 'success'
      };
      
      return colorMap[this.processo.prioridade];
    }
}
