import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
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
  @Input() modoSelecao: boolean = false;
  @Input() selecionado: boolean = false;

  @Output() longPress = new EventEmitter<void>();
  @Output() toggleSelecao = new EventEmitter<void>();

  private pressTimer: any;
  private readonly LONG_PRESS_DURATION = 500; // ms

  constructor(private router: Router) {}

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onPressStart(event: Event) {
    if (this.modoSelecao) return;
    
    this.pressTimer = setTimeout(() => {
      this.longPress.emit();
    }, this.LONG_PRESS_DURATION);
  }

  @HostListener('touchend', ['$event'])
  @HostListener('mouseup', ['$event'])
  @HostListener('touchcancel', ['$event'])
  onPressEnd(event: Event) {
    clearTimeout(this.pressTimer);
  }

  abrirProcesso(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    
    if (this.modoSelecao) {
      this.toggleSelecao.emit();
    } else {
      this.router.navigate(['/processo', this.processo.id]);
    }
  }

  onCheckboxChange(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.toggleSelecao.emit();
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