import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Processo } from '../services/models/processo.model';

@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessoComponent {
  private platform = inject(Platform);
  @Input() processo?: Processo;
  isIos() {
    return this.platform.is('ios')
  }
}
