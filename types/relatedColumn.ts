import { ChatCompletion } from 'groq-sdk/resources/chat.mjs'

export interface IRelatedColumn {
  system: string
  client: string
  isValid(): boolean
}

export class RelatedColumn implements IRelatedColumn {
  system: string
  client: string

  constructor(system: string, client: string) {
    this.system = system
    this.client = client
  }

  public isValid(): boolean {
    return this.system !== '' && this.client !== ''
  }
}
