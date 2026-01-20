import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Processo, PrioridadeProcesso } from '../services/models/processo.model';

interface Atividade {
  id: number;
  nome: string;
}

interface Equipe {
  id: number;
  nome: string;
  atividades: Atividade[];
}

interface DestinoSelecionado {
  equipeId: number;
  equipe: string;
  atividadeId: number;
  atividade: string;
}

interface MembroEquipe {
  id: string;
  nome: string;
  cargo: string;
}

@Component({
  selector: 'app-movimentar',
  templateUrl: './movimentar.page.html',
  styleUrls: ['./movimentar.page.scss'],
  standalone: false
})
export class MovimentarPage implements OnInit, AfterViewInit {
  processo?: Processo;
  form!: FormGroup;

  @ViewChild('switchTrabalhada', { read: ElementRef }) switchTrabalhada?: ElementRef;
  @ViewChild('switchConcluida', { read: ElementRef, static: false }) switchConcluida?: ElementRef;

  private switchConcluidaListenersAdded = false;

  // Controle de estados
  buscaDestino = '';
  equipesExpandidas = new Set<number>();
  destinoSelecionado?: DestinoSelecionado;

  // Dados mock
  equipes: Equipe[] = [
    {
      id: 1,
      nome: 'Turma Ordinária 2A',
      atividades: [
        { id: 101, nome: 'Seção 01' },
        { id: 102, nome: 'Seção 02' }
      ]
    },
    {
      id: 2,
      nome: 'Turma Ordinária 3B',
      atividades: [
        { id: 201, nome: 'Análise Técnica' },
        { id: 202, nome: 'Revisão Documental' }
      ]
    },
    {
      id: 3,
      nome: 'Câmara Superior',
      atividades: [
        { id: 301, nome: 'Julgamento' },
        { id: 302, nome: 'Recursos' }
      ]
    }
  ];

  equipesFiltradas: Equipe[] = [];

  membrosEquipe: MembroEquipe[] = [
    { id: 'joao', nome: 'João Pedro Costa', cargo: 'Analista Tributário' },
    { id: 'ana', nome: 'Ana Carolina Souza', cargo: 'Conselheira' },
    { id: 'carlos', nome: 'Carlos Eduardo Lima', cargo: 'Analista Sênior' },
    { id: 'fernanda', nome: 'Fernanda Oliveira', cargo: 'Assessora Técnica' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private alertController: AlertController,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      atividadeTrabalhada: [true], // Inicia MARCADO (atividade foi trabalhada)
      motivoNaoTrabalhada: [''],
      detalhamentoNaoTrabalhada: [''],
      atividadeConcluida: [false], // Inicia desmarcado
      horasFRA: [''],
      responsavelSelecionado: [this.membrosEquipe[0]?.id || '']
    });

    // Observa mudanças no switch de atividade trabalhada
    this.form.get('atividadeTrabalhada')?.valueChanges.subscribe(valor => {
      console.log('✅ FormControl atividadeTrabalhada mudou para:', valor);
      this.onAtividadeTrabalhadaChange(valor);
    });

    // Observa mudanças no switch de atividade concluída
    this.form.get('atividadeConcluida')?.valueChanges.subscribe(valor => {
      console.log('✅ FormControl atividadeConcluida mudou para:', valor);
      this.onAtividadeConcluidaChange(valor);
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.processo = this.dataService.getProcessoById(Number(id));
    }

    this.equipesFiltradas = [...this.equipes];
  }

  ngAfterViewInit() {
    // Aguarda web components carregarem completamente
    setTimeout(() => {
      // Adiciona listener nativo para o switch de atividade trabalhada
      if (this.switchTrabalhada) {
        const element = this.switchTrabalhada.nativeElement;
        console.log('🔵 Switch Trabalhada encontrado:', element);
        console.log('🔵 Tag name:', element.tagName);
        console.log('🔵 Checked inicial:', element.checked);
        
        // Tenta diferentes eventos
        ['change', 'onChange', 'onchange', 'click', 'input'].forEach(eventName => {
          element.addEventListener(eventName, (event: any) => {
            console.log(`🔵 Evento "${eventName}" capturado!`, event);
            console.log('🔵 event.target:', event.target);
            console.log('🔵 event.detail:', event.detail);
            
            // Tenta diferentes formas de pegar o valor
            const valor = event.target?.checked ?? event.detail?.checked ?? !this.form.get('atividadeTrabalhada')?.value;
            console.log('🔵 Valor extraído:', valor);
            
            this.form.patchValue({ atividadeTrabalhada: valor });
            this.cdr.detectChanges();
          });
        });
        
        console.log('✅ Listeners do switch trabalhada adicionados!');
      } else {
        console.error('❌ switchTrabalhada não encontrado!');
      }

      // Como atividadeTrabalhada inicia TRUE, o segundo switch já está visível
      // Tenta conectá-lo também na inicialização
      this.conectarSwitchConcluida();
    }, 100); // Aguarda 100ms para web components carregarem
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

  toggleEquipe(equipeId: number) {
    if (this.equipesExpandidas.has(equipeId)) {
      this.equipesExpandidas.delete(equipeId);
    } else {
      this.equipesExpandidas.add(equipeId);
    }
  }

  selecionarDestino(equipe: Equipe, atividade: Atividade) {
    this.destinoSelecionado = {
      equipeId: equipe.id,
      equipe: equipe.nome,
      atividadeId: atividade.id,
      atividade: atividade.nome
    };
  }

  filtrarDestinos() {
    const termo = this.buscaDestino.toLowerCase().trim();
    
    if (!termo) {
      this.equipesFiltradas = [...this.equipes];
      return;
    }

    this.equipesFiltradas = this.equipes.filter(equipe => {
      const nomeEquipe = equipe.nome.toLowerCase().includes(termo);
      const temAtividade = equipe.atividades.some(a => 
        a.nome.toLowerCase().includes(termo)
      );
      return nomeEquipe || temAtividade;
    });
  }

  onAtividadeTrabalhadaChange(valor: boolean) {
    console.log('📝 Mudança detectada - Atividade trabalhada:', valor);
    
    if (valor) {
      // Se marcou como trabalhada, limpa o motivo
      this.form.patchValue({
        motivoNaoTrabalhada: '',
        detalhamentoNaoTrabalhada: ''
      }, { emitEvent: false });
      
      // Tenta conectar o segundo switch após o Angular renderizar
      setTimeout(() => {
        this.conectarSwitchConcluida();
      }, 100);
    } else {
      // Se desmarcou trabalhada, limpa todos os outros campos também
      this.form.patchValue({
        atividadeConcluida: false,
        horasFRA: '',
        responsavelSelecionado: this.membrosEquipe[0]?.id || ''
      }, { emitEvent: false });
    }
  }

  conectarSwitchConcluida() {
    if (this.switchConcluidaListenersAdded) {
      return; // Já foi conectado
    }

    if (this.switchConcluida) {
      const element = this.switchConcluida.nativeElement;
      console.log('🟢 Switch Concluída encontrado (dinamicamente):', element);
      console.log('🟢 Tag name:', element.tagName);
      console.log('🟢 Checked inicial:', element.checked);
      
      // Tenta diferentes eventos
      ['change', 'onChange', 'onchange', 'click', 'input'].forEach(eventName => {
        element.addEventListener(eventName, (event: any) => {
          console.log(`🟢 Evento "${eventName}" capturado!`, event);
          console.log('🟢 event.target:', event.target);
          console.log('🟢 event.detail:', event.detail);
          
          const valor = event.target?.checked ?? event.detail?.checked ?? !this.form.get('atividadeConcluida')?.value;
          console.log('🟢 Valor extraído:', valor);
          
          this.form.patchValue({ atividadeConcluida: valor });
          this.cdr.detectChanges();
        });
      });
      
      this.switchConcluidaListenersAdded = true;
      console.log('✅ Listeners do switch concluída adicionados!');
    } else {
      console.log('⏳ Switch concluída ainda não está no DOM, tentando novamente...');
      // Tenta novamente após mais tempo
      setTimeout(() => {
        this.conectarSwitchConcluida();
      }, 200);
    }
  }

  onAtividadeConcluidaChange(valor: boolean) {
    // Limpa o campo de horas quando muda o switch
    if (!valor) {
      this.form.patchValue({ horasFRA: '' });
    }
  }

  async abrirModalTarefa() {
    const alert = await this.alertController.create({
      header: 'Definir Tarefa',
      message: 'Funcionalidade em desenvolvimento',
      buttons: ['OK']
    });
    await alert.present();
  }

  async abrirModalDespacho() {
    const alert = await this.alertController.create({
      header: 'Elaborar Despacho',
      message: 'Funcionalidade em desenvolvimento',
      buttons: ['OK']
    });
    await alert.present();
  }

  async abrirModalAgendamento() {
    const alert = await this.alertController.create({
      header: 'Agendar Movimentação',
      message: 'Funcionalidade em desenvolvimento',
      buttons: ['OK']
    });
    await alert.present();
  }

  async devolverOrigem() {
    const alert = await this.alertController.create({
      header: 'Devolver à Origem',
      message: 'Deseja devolver o processo para a origem?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Confirmar',
          handler: () => {
            console.log('Processo devolvido à origem');
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmarMovimentacao() {
    if (!this.destinoSelecionado) {
      const alert = await this.alertController.create({
        header: 'Atenção',
        message: 'Por favor, selecione o destino da movimentação.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: `Movimentação realizada com sucesso!

Integrações executadas:
✓ Portal do CARF
✓ COMPROT
✓ Atualização de palavras-chave
✓ Atualização do andamento no SEI`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();

    console.log('Dados da movimentação:', {
      destino: this.destinoSelecionado,
      ...this.form.value
    });
  }

  cancelar() {
    this.router.navigate(['/home']);
  }
}
