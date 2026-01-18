import { Component, inject, ViewChild } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { IonSearchbar } from '@ionic/angular';

import { DataService } from '../services/data.service';
import {
  Processo,
  PrioridadeProcesso
} from '../services/models/processo.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})

export class HomePage {

  private data = inject(DataService);

  @ViewChild('searchbar') searchbar!: IonSearchbar;



  processos: Processo[] = [];
  processosFiltrados: Processo[] = [];

  hideHeader = false;
  lastScrollTop = 0;

  /* =========================
   * PRIORIDADES (TIPADAS)
   * ========================= */

  prioridades: {
    tipo: PrioridadeProcesso;
    color: string;
  }[] = [
      { tipo: PrioridadeProcesso.MAXIMA, color: 'danger' },
      { tipo: PrioridadeProcesso.ALTA, color: 'warning' },
      { tipo: PrioridadeProcesso.MEDIA, color: 'primary' },
      { tipo: PrioridadeProcesso.BAIXA, color: 'success' },

    ];

  quantidadeProcessos = 0;
  constructor() {
    this.processos = this.data.getProcessos();
    this.processosFiltrados = [...this.processos];
    this.quantidadeProcessos = this.data.getQuantidadeProcessos();
  }

  /* =========================
   * REFRESH
   * ========================= */

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  /* =========================
   * SCROLL HEADER
   * ========================= */

  onScroll(ev: any) {
    const currentScroll = ev.detail.scrollTop;

    if (currentScroll < this.lastScrollTop) {
      this.hideHeader = false;
    }

    if (currentScroll > this.lastScrollTop && currentScroll > 56) {
      this.hideHeader = true;
    }

    this.lastScrollTop = currentScroll;
  }

  /* =========================
   * FILTRO
   * ========================= */

  handleInput(event: Event) {
    const searchbar = event.target as HTMLIonSearchbarElement;
    this.filtroTexto = (searchbar.value || '').toLowerCase().trim();
    this.aplicarFiltros();
  }


  private matchProcesso(p: Processo, query: string): boolean {
    return Object.values(p).some(value => {
      if (value instanceof Date) {
        return value.toISOString().toLowerCase().includes(query);
      }
      return String(value).toLowerCase().includes(query);
    });
  }

  /* =========================
   * AGRUPAMENTO
   * ========================= */

  processosPorPrioridade(prioridade: PrioridadeProcesso): Processo[] {
    return this.processosFiltrados.filter(
      p => p.prioridade === prioridade
    );
  }

  get valoresAccordion(): PrioridadeProcesso[] {
    return this.prioridades.map(p => p.tipo);
  }

  getLabel(prioridade: PrioridadeProcesso) {
    return prioridade; // ou mapear para i18n depois
  }

  get estaFiltrando(): boolean {
    return (
      !!this.filtroTexto ||
      this.filtroLiberar ||
      this.filtroAssinar
    );
  }

  get quantidadeProcessosFiltrados(): number {
    return this.processosFiltrados.length;
  }

  filtroTexto = '';
  filtroLiberar = false;
  filtroAssinar = false;
  private aplicarFiltros() {
    this.processosFiltrados = this.processos.filter((p) => {

      // 🔍 texto
      const matchTexto =
        !this.filtroTexto || this.matchProcesso(p, this.filtroTexto);

      // 📝 liberar
      const matchLiberar =
        !this.filtroLiberar || p.indicadorProvidenciaAberta;

      // ✍️ assinar
      const matchAssinar =
        !this.filtroAssinar || p.indicadorPendenteAssinatura;

      return matchTexto && matchLiberar && matchAssinar;
    });
  }

  filtrarLiberar() {
    this.filtroLiberar = true;
    this.filtroAssinar = false;
    this.aplicarFiltros();
  }

  filtrarAssinar() {
    this.filtroAssinar = true;
    this.filtroLiberar = false;
    this.aplicarFiltros();
  }

  limparFiltrosAcoes() {
    this.filtroLiberar = false;
    this.filtroAssinar = false;
    this.aplicarFiltros();
  }
  limparTodosFiltros() {
    this.filtroTexto = '';
    this.filtroLiberar = false;
    this.filtroAssinar = false;

    this.processosFiltrados = [...this.processos];

    if (this.searchbar) {
      this.searchbar.value = '';
    }
  }


}
