import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { ProcessoComponent } from '../processo/processo.component';

import { DataService, Processo } from '../services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  private data = inject(DataService);

  processos: Processo[] = [];
  processosFiltrados: Processo[] = [];

  hideHeader = false;

  constructor() {
    this.processos = this.data.getProcessos();
    this.processosFiltrados = [...this.processos];
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  lastScrollTop = 0;

  onScroll(ev: any) {
    const currentScroll = ev.detail.scrollTop;

    // usuário começou a subir
    if (currentScroll < this.lastScrollTop) {
      this.hideHeader = false;
    }

    // usuário está descendo e já passou do threshold
    if (currentScroll > this.lastScrollTop && currentScroll > 56) {
      this.hideHeader = true;
    }

    this.lastScrollTop = currentScroll;
  }

  private matchProcesso(p: Processo, query: string): boolean {
    return Object.entries(p).some(([_, value]) => {
      if (value instanceof Date) {
        return value.toISOString().toLowerCase().includes(query);
      }
      return String(value).toLowerCase().includes(query);
    });
  }

  handleInput(event: Event) {
    const searchbar = event.target as HTMLIonSearchbarElement;
    const query = (searchbar.value || '').toLowerCase().trim();

    this.processosFiltrados = query
      ? this.processos.filter((p) => this.matchProcesso(p, query))
      : [...this.processos];
  }

}

