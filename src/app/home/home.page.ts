import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { RefresherCustomEvent, PopoverController } from '@ionic/angular';
import { IonSearchbar } from '@ionic/angular';

import { DataService } from '../services/data.service';
import {
  Processo,
  PrioridadeProcesso
} from '../services/models/processo.model';
import { MenuPopoverComponent } from '../components/menu-popover/menu-popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomePage {

  private data = inject(DataService);
  private cdr = inject(ChangeDetectorRef);
  private popoverCtrl = inject(PopoverController);

  @ViewChild('searchbar') searchbar!: IonSearchbar;

  processos: Processo[] = [];
  processosFiltrados: Processo[] = [];

  hideHeader = false;
  lastScrollTop = 0;

  // Seleção múltipla
  modoSelecao = false;
  processosSelecionados = new Set<number>();

  // Cache para evitar recálculos
  private processosCache = new Map<PrioridadeProcesso, Processo[]>();

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

  // Accordions abertos por padrão
  accordionsAbertos = [
    PrioridadeProcesso.MAXIMA,
    PrioridadeProcesso.ALTA,
    PrioridadeProcesso.MEDIA,
    PrioridadeProcesso.BAIXA
  ];
  
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
    if (!this.processosCache.has(prioridade)) {
      this.processosCache.set(
        prioridade,
        this.processosFiltrados.filter(p => p.prioridade === prioridade)
      );
    }
    return this.processosCache.get(prioridade)!;
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

    // Limpa o cache quando os filtros mudam
    this.processosCache.clear();
    this.cdr.markForCheck();
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
    this.processosCache.clear();

    if (this.searchbar) {
      this.searchbar.value = '';
    }

    this.cdr.markForCheck();
  }

  /* =========================
   * MENU POPOVER
   * ========================= */

  async abrirMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: MenuPopoverComponent,
      event: event,
      translucent: true,
      showBackdrop: true,
      dismissOnSelect: true,
      componentProps: {
        modoSelecao: this.modoSelecao,
        quantidadeSelecionados: this.processosSelecionados.size
      }
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    
    if (data?.acao) {
      if (data.acao === 'ativar-selecao') {
        this.ativarModoSelecao();
      } else {
        this.executarAcaoMultipla(data.acao);
      }
    }
  }

  /* =========================
   * SELEÇÃO MÚLTIPLA
   * ========================= */

  ativarModoSelecao() {
    this.modoSelecao = true;
    this.cdr.markForCheck();
  }

  iniciarSelecao(processoId: number) {
    this.modoSelecao = true;
    this.processosSelecionados.add(processoId);
    this.cdr.markForCheck();
  }

  toggleSelecao(processoId: number) {
    if (this.processosSelecionados.has(processoId)) {
      this.processosSelecionados.delete(processoId);
    } else {
      this.processosSelecionados.add(processoId);
    }

    // Não cancela automaticamente se não houver selecionados
    // O usuário precisa clicar no X para sair do modo
    
    this.cdr.markForCheck();
  }

  cancelarSelecao() {
    this.modoSelecao = false;
    this.processosSelecionados.clear();
    this.cdr.markForCheck();
  }

  isProcessoSelecionado(processoId: number): boolean {
    return this.processosSelecionados.has(processoId);
  }

  executarAcaoMultipla(acao: 'liberar' | 'movimentar' | 'arquivar') {
    console.log(`Executando ${acao} em ${this.processosSelecionados.size} processos:`, 
      Array.from(this.processosSelecionados));
    
    // Aqui você implementaria a lógica real de cada ação
    // Por enquanto, apenas cancela a seleção
    this.cancelarSelecao();
  }
}