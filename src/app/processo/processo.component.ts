import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Processo } from '../services/models/processo.model';

@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessoComponent {
  @Input() processo!: Processo;

  constructor(private router: Router) {}

  abrirProcesso(event: Event) {
    event.stopPropagation(); // 🔑 impede o accordion de reagir
    event.preventDefault();

    this.router.navigate(['/processo', this.processo.id]);
  }
}
