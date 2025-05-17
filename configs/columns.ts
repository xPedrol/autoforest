const cadastroColumns = {
  columns: [
    'id_Talhao',
    'Fazenda',
    'Projeto',
    'Talhao',
    'AreaTalhao',
    'MatGenetico',
    'Espacamento',
    'DataRotacao',
  ],
  description: {
    id_Talhao: 'ID do talhão onde a árvore está localizada.',
    fazenda: 'Nome da fazenda onde a árvore está localizada.',
    projeto: 'Nome do projeto onde a árvore está localizada.',
    talhao: 'Nome do talhão onde a árvore está localizada.',
    areaTalhao: 'Área do talhão onde a árvore está localizada.',
    matGenetico: 'Matriz genética da árvore.',
    espacamento: 'Espaçamento entre as árvores.',
    dataRotacao: 'Data da rotação da árvore.',
    status: 'Status da árvore (ativa, inativa, etc.).',
  },
}

const inventarioColumns = {
  columns: [
    'id_Talhao',
    'Parcela',
    'DataMedicao',
    'CoordenadaX',
    'CoordenadaY',
    'AreaParcela_m2',
    'Fila',
    'Cova',
    'Fuste',
    'dap_cm',
    'HtObs_m',
    'Codigo',
  ],
  description: {
    id_Talhao: 'ID do talhão onde a árvore está localizada.',
    parcela: 'Número da parcela onde a árvore está localizada.',
    dataMedicao: 'Data da medição da árvore.',
    coordenadaX: 'Coordenada X da árvore.',
    coordenadaY: 'Coordenada Y da árvore.',
    areaParcela_m2: 'Área da parcela onde a árvore está localizada (em m²).',
    fila: 'Número da fila onde a árvore está localizada.',
    cova: 'Número da cova onde a árvore está localizada.',
    fuste: 'Número do fuste da árvore.',
    dap_cm: 'Diâmetro à altura do peito da árvore (em cm).',
    htObs_m: 'Altura total da árvore (em m).',
    codigo: 'Código identificador da árvore.',
    status: 'Status da árvore (ativa, inativa, etc.).',
  },
}

export abstract class Columns {
  protected list: string[]
  protected description: Record<string, string>
  public uploadDescription: string
  constructor() {
    this.list = []
    this.description = {}
    this.uploadDescription = ''
  }

  public stringifyDescriptions() {
    return this.list.join(', ')
  }

  public stringifyColumns() {
    return this.list
      .map((column) => {
        return `Coluna: ${column}`
      })
      .join(', ')
  }

  public getDescription(column: string) {
    return this.description[column] || 'Descrição não encontrada'
  }
}

export class CadastroColumns extends Columns {
  constructor() {
    super()
    this.list = cadastroColumns.columns
    this.description = cadastroColumns.description
    this.uploadDescription = 'Submeta sua planilha de cadastro florestal'
  }
}

export class InventarioColumns extends Columns {
  constructor() {
    super()
    this.list = inventarioColumns.columns
    this.description = inventarioColumns.description
    this.uploadDescription = 'Submeta sua planilha de inventário florestal'
  }
}
