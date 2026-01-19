import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Processo, PrioridadeProcesso } from '../services/models/processo.model';

@Component({
  selector: 'app-movimentar',
  templateUrl: './movimentar.page.html',
  styleUrls: ['./movimentar.page.scss'],
  standalone:false
})
export class MovimentarPage implements OnInit {
  processo?: Processo;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.processo = this.dataService.getProcessoById(Number(id));
    }
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
