import Groq from 'groq-sdk'
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat.mjs'
import { ChatCompletion } from 'groq-sdk/resources/chat.js'
const model = process.env.NEXT_PUBLIC_GROQ_MODEL as string
export interface IIAWrapper {
  getRelatedColumns(
    clientColumns: string,
    columnType: string,
  ): Promise<ChatCompletion>
  getDescription(
    relatedColumns: string,
    columnType: string,
  ): Promise<ChatCompletion>
}

export class IAWrapper implements IIAWrapper {
  private readonly client: Groq
  private readonly systemPrompt: string
  private readonly columnAnalysisPrompt: string
  constructor() {
    this.client = new Groq({
      dangerouslyAllowBrowser: true,
      apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    })
    this.systemPrompt = `
Você é um analista de dados especializado em mapeamento e análise de dados de cadeia de custódia florestal.
Sua tarefa é explicar as relações entre colunas de diferentes bases de dados.

Você receberá:
1. Uma lista de colunas do cliente com suas correspondentes do sistema
2. Uma descrição detalhada das colunas do sistema

Para cada par de colunas relacionadas, você deve:
- Analisar a semelhança entre elas no contexto de cadeia de custódia florestal
- Explicar por que elas são compatíveis considerando as práticas do setor florestal

Formato de resposta (HTML):
<div class="column-relation">
  <ul>
    <li><strong>Sistema:</strong> {nome_coluna_sistema}</li>
    <li><strong>Cliente:</strong> {nome_coluna_cliente}</li>
  </ul>
  <p>{explicação detalhada da relação entre as colunas, incluindo:
    - Por que são semelhantes no contexto florestal
    - Qualquer observação importante sobre a compatibilidade com processos florestais}</p>
</div>
<hr/>

Mantenha as explicações objetivas e técnicas. Não inclua elementos HTML adicionais além dos especificados acima.`.trim()

    this.columnAnalysisPrompt = `
Você é um analista de dados especializado em mapeamento de dados e integração de sistemas de cadeia de custódia florestal.

Sua tarefa é analisar e relacionar duas estruturas de dados diferentes que contêm informações sobre processos florestais:
1. Colunas do sistema existente
2. Colunas fornecidas pelo cliente

Diretrizes para análise:
- Compare os nomes das colunas semanticamente no contexto florestal
- Busque relações mesmo quando os nomes não são idênticos, mas representam conceitos similares na cadeia de custódia

Regras importantes:
- Uma coluna do sistema pode se relacionar com múltiplas colunas do cliente
- Priorize relações que façam sentido no contexto de manejo florestal

Formato da resposta (JSON estrito):
[
  {
    "system": "nomeColunaSistema",
    "client": "nomeColunaCliente"
  }
]

Retorne apenas o JSON puro, sem explicações ou formatação adicional.`.trim()
  }

  private createDescriptionBody(
    relatedColumns: string,
    columnType: string,
  ): ChatCompletionMessageParam[] {
    return [
      {
        role: 'system',
        content: this.systemPrompt,
      },
      {
        role: 'user',
        content: `Descrição das colunas do sistema: ${columnType}
        Relação das colunas do sistema com as colunas do cliente: ${relatedColumns}`,
      },
    ]
  }

  private createColumnsBody(
    clientColumns: string,
    columnType: string,
  ): ChatCompletionMessageParam[] {
    return [
      {
        role: 'system',
        content: this.columnAnalysisPrompt,
      },
      {
        role: 'user',
        content: `
        Dados as duas listas:
        - colunas do sistema: ${columnType}
        - colunas do cliente: ${clientColumns}
        Retorne o vetor com as relações entre as colunas do sistema e do cliente.`.trim(),
      },
    ]
  }

  public async getRelatedColumns(
    clientColumns: string,
    columnType: string,
  ): Promise<ChatCompletion> {
    return this.client.chat.completions.create({
      model,
      messages: this.createColumnsBody(clientColumns, columnType),
    })
  }

  public async getDescription(
    relatedColumns: string,
    columnType: string,
  ): Promise<ChatCompletion> {
    return this.client.chat.completions.create({
      model,
      messages: this.createDescriptionBody(relatedColumns, columnType),
    })
  }
}

export const groqService = new IAWrapper()
