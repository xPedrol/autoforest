import Groq from 'groq-sdk'
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat.mjs'
import {
  stringifyRelatedColumns,
  stringifySystemColumns,
  systemColumns,
} from './columns'
import { TRelatedColumn } from '@/types/relatedColumn'

export const groqClient = new Groq({
  dangerouslyAllowBrowser: true,
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
})

export const createGroqDescriptionBody = (relatedColumns: TRelatedColumn[]) => {
  return [
    {
      role: 'system',
      content: `
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

Mantenha as explicações objetivas e técnicas. Não inclua elementos HTML adicionais além dos especificados acima.
      `.trim(),
    },
    {
      role: 'user',
      content: `Descrição das colunas do sistema: ${stringifySystemColumns()}
      Relação das colunas do sistema com as colunas do cliente: ${stringifyRelatedColumns(
        relatedColumns,
      )}`,
    },
  ] satisfies Array<ChatCompletionMessageParam>
}

export const createGroqColumnsBody = (clientColumns: string) => {
  return [
    {
      role: 'system',
      content: `
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

Retorne apenas o JSON puro, sem explicações ou formatação adicional.
      `.trim(),
    },
    {
      role: 'user',
      content: `
      Dados as duas listas:
      - colunas do sistema: ${systemColumns}
      - colunas do cliente: ${clientColumns}
      Retorne o vetor com as relações entre as colunas do sistema e do cliente.`.trim(),
    },
  ] satisfies Array<ChatCompletionMessageParam>
}
