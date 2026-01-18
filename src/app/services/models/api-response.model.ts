import { ProcessoRaw } from './processo.model';

export type ApiResponse = {
  quantidadeProcessos: number;
  processos: ProcessoRaw[];
};
