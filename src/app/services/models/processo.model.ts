/* =========================
 * ENUMS
 * ========================= */

export enum PrioridadeProcesso {
  MAXIMA = 'MÁXIMA',
  ALTA = 'ALTA',
  MEDIA = 'MÉDIA',
  BAIXA = 'BAIXA',
}

export enum NivelSigilo {
  BASICO = 'BÁSICO',
  INTERMEDIARIO = 'INTERMEDIÁRIO',
  TOTAL = 'TOTAL',
}

/* =========================
 * MODELO DO DOMÍNIO (FRONTEND)
 * ========================= */

export interface Processo {
  id: number;
  numero: number;
  numeroFormatado: string;

  niInteressado: string;
  nomeInteressado: string;

  dataProtocolo: Date;
  dataDistribuicaoUltima: Date;

  indicadorNotaProcesso: boolean;
  indicadorProvidenciaAberta: boolean;
  indicadorPendenteAssinatura: boolean;
  indicadorPossuiHabilitacaoNivelSigilo: boolean;

  prioridade: PrioridadeProcesso;

  ehResponsavelProcesso: boolean;
  cpfResponsavelAtual: string;

  exibirEmNegrito: boolean;

  nivelSigiloInterno: NivelSigilo;
  nivelSigiloExterno: NivelSigilo;

  indicadorNomeNIInteressadoSigiloso: boolean;
}

/* =========================
 * MODELO DA API (RAW / DTO)
 * ========================= */

export interface ProcessoRaw {
  id: number;
  numero: string;
  numeroFormatado: string;

  niInteressado: string;
  nomeInteressado: string;

  dataProtocolo: string;            // "26/02/2025"
  dataDistribuicaoUltima: string;   // "26/02/2025"

  indicadorNotaProcesso: boolean;
  indicadorProvidenciaAberta: boolean;
  indicadorPendenteAssinatura: boolean;
  indicadorPossuiHabilitacaoNivelSigilo: boolean;

  prioridade: string;               // "MAXIMA"

  ehResponsavelProcesso: boolean;
  cpfResponsavelAtual: string;

  exibirEmNegrito: boolean;

  nivelSigiloInterno: string;        // "BÁSICO"
  nivelSigiloExterno: string;

  indicadorNomeNIInteressadoSigiloso: boolean;
}
