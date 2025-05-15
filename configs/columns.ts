import { TRelatedColumn } from '@/types/relatedColumn'

export const systemColumns = [
  'fazenda',
  'talhao',
  'medicao',
  'parcela',
  'digitacao',
  'c1c2',
  'l1l2',
  'fila',
  'numeroArvore',
  'cap',
  'ht',
  'status',
]
export const systemColumnsDescription = {
  fazenda: 'Nome da fazenda onde a árvore está localizada.',
  talhao: 'Nome do talhão onde a árvore está localizada.',
  medicao: 'Data da medição da árvore.',
  parcela: 'Número da parcela onde a árvore está localizada.',
  digitacao: 'Data da digitação dos dados da árvore.',
  c1c2: 'C1 e C2 são os diâmetros da árvore medidos em centímetros.',
  l1l2: 'L1 e L2 são as alturas da árvore medidas em metros.',
  fila: 'Número da fila onde a árvore está localizada.',
  numeroArvore: 'Número da árvore dentro do talhão.',
  cap: 'Capacidade de crescimento da árvore.',
  ht: 'Altura total da árvore.',
  status: 'Status da árvore (ativa, inativa, etc.).',
}

export const stringifySystemColumns = () => {
  return systemColumns
    .map((column) => {
      const description =
        systemColumnsDescription[
          column as keyof typeof systemColumnsDescription
        ]
      return `${column}: ${description}`
    })
    .join(', ')
}

export const stringifyRelatedColumns = (relatedColumns: TRelatedColumn[]) => {
  return relatedColumns
    .map((column) => {
      return `Coluna do cliente: ${column.client}, Coluna sistema: ${column.system}`
    })
    .join(', ')
}
