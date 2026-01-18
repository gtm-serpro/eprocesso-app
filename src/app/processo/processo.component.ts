import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Processo, PrioridadeProcesso } from '../services/models/processo.model';

@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessoComponent {
  @Input() processo!: Processo;
  @Input() searchTerm: string = '';

  constructor(private router: Router) {}

  abrirProcesso(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.router.navigate(['/processo', this.processo.id]);
  }
  
  arquivar(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.router.navigate(['/arquivar', this.processo.id]);
  }

  movimentar(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.router.navigate(['/movimentar', this.processo.id]);
  }

  liberar(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.router.navigate(['/liberar', this.processo.id]);
  }

  getSigiloClass(): string {
    const classMap: Record<PrioridadeProcesso, string> = {
      [PrioridadeProcesso.MAXIMA]: 'danger',
      [PrioridadeProcesso.ALTA]: 'warning',
      [PrioridadeProcesso.MEDIA]: 'primary',
      [PrioridadeProcesso.BAIXA]: 'success'
    };
    return classMap[this.processo.prioridade];
  }
}
