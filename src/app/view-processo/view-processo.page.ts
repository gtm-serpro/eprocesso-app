import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Processo, PrioridadeProcesso } from '../services/models/processo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-view-processo',
  templateUrl: './view-processo.page.html',
  styleUrls: ['./view-processo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewProcessoPage implements OnInit {

  processo?: Processo;
  abaSelecionada = 'documento';

  // Dados mock para as abas
  documentos: any[] = [];
  providencias: any[] = [];
  notas: any[] = [];
  palavrasChave: any[] = [];
  historico: any[] = [];

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

  selecionarAba(aba: string) {
    this.abaSelecionada = aba;
  }
}