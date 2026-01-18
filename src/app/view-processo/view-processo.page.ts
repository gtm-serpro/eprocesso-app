import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';

import { DataService } from '../services/data.service';
import { Processo } from '../services/models/processo.model';

@Component({
  selector: 'app-view-processo',
  templateUrl: './view-processo.page.html',
  styleUrls: ['./view-processo.page.scss'],
  standalone: false,
})
export class ViewProcessoPage implements OnInit {
  processo!: Processo;

  private data = inject(DataService);
  private route = inject(ActivatedRoute);
  private platform = inject(Platform);

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      throw new Error('ID do processo não informado na rota');
    }

    const id = Number(idParam);
    this.processo = this.data.getProcessoById(id);
  }

  getBackButtonText(): string {
    return this.platform.is('ios') ? 'Inbox' : '';
  }
}
