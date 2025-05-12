import Groq from 'groq-sdk'
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat.mjs'

export const groqClient = new Groq({
  dangerouslyAllowBrowser: true,
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
})

export const createGroqBody = (headerList: string, sampleRow: string) => {
  return [
    {
      role: 'system',
      content: `
Você é um analista de dados especializado.  
Receberá nomes de colunas e exemplos de dados, representando informações sobre a cadeia de custodia florestal de uma empresa; retorne um bloco HTML resumido, sem tags de título ou cabeçalho.  
Para cada coluna:
- <p><strong>o nome da coluna</strong>:
- Abaixo, uma breve análise em texto corrido  
Ubique cada coluna em nova linha.  
Não inclua elementos extras.
</p>
<br />
      `.trim(),
    },
    {
      role: 'user',
      content: `Colunas: ${headerList}. Exemplo: ${sampleRow}.`,
    },
  ] satisfies Array<ChatCompletionMessageParam>
}
