import { IRelatedColumn, RelatedColumn } from './relatedColumn'
import { Xlsx } from './Xlsx'

export interface ISpreadsheet {
  getRelationship(): IRelatedColumn[]
  getDescription(): string
  getXlsx(): Xlsx
  setRelationship(relationship: IRelatedColumn[]): void
  setDescription(description: string): void
  setXlsx(xlsx: Xlsx): void
  normalizeJsonData(): void
  reset(): void
}

export class Spreadsheet implements ISpreadsheet {
  private relationship: IRelatedColumn[]
  private description: string
  private xlsx: Xlsx

  constructor(
    relationship: IRelatedColumn[] = [],
    description: string = '',
    xlsx: Xlsx = new Xlsx(),
  ) {
    this.relationship = relationship
    this.description = description
    this.xlsx = xlsx
  }

  public getRelationship(): IRelatedColumn[] {
    return this.relationship
  }

  public getDescription(): string {
    return this.description
  }
  public getXlsx(): Xlsx {
    return this.xlsx
  }
  public setRelationship(relationship: IRelatedColumn[]): void {
    this.relationship = relationship.map((item) => {
      return new RelatedColumn(item.system, item.client)
    })
  }

  public stringifyRelationship() {
    return this.relationship
      .map((column) => {
        return `Coluna do cliente: ${column.client}, Coluna sistema: ${column.system}`
      })
      .join(', ')
  }

  public changeRelationship(index: number, newClient: string): void {
    this.relationship[index].client = newClient
  }

  public setDescription(description: string): void {
    this.description = description
  }
  public setXlsx(xlsx: Xlsx): void {
    this.xlsx = xlsx
  }
  public isValid(): boolean {
    if (!this.xlsx.file) {
      return false
    }
    if (this.relationship.length === 0) {
      return false
    }
    const uniqueClients = new Set<string>()
    for (const column of this.relationship) {
      if (!column.isValid()) {
        return false
      }
      uniqueClients.add(column.client)
    }
    return uniqueClients.size === this.relationship.length
  }

  private createMapFromRelationship(): Map<string, string> {
    const map = new Map<string, string>()
    this.relationship.forEach((column) => {
      map.set(column.client, column.system)
    })
    return map
  }

  public normalizeJsonData(): Record<string, string>[] {
    return this.xlsx.normalizeJsonData(this.createMapFromRelationship())
  }

  public reset(): void {
    this.relationship = []
    this.description = ''
    this.xlsx = new Xlsx()
  }
}

export interface ISpreadsheetArray {
  getSpreadsheet(index: number): Spreadsheet
  getAllHeaders(): string[]
  isValid(): boolean
  length(): number
  normalizeSpreadsheets(key: string): Record<string, string>[]
}
export class SpreadsheetArray implements ISpreadsheetArray {
  private spreadsheets: Spreadsheet[]

  constructor(startWith: number = 0) {
    const spreadsheets: Spreadsheet[] = []
    for (let i = 0; i < startWith; i++) {
      spreadsheets.push(new Spreadsheet())
    }
    this.spreadsheets = spreadsheets
  }

  public getSpreadsheet(index: number): Spreadsheet {
    return this.spreadsheets[index]
  }

  public getAllHeaders(): string[] {
    return this.spreadsheets.reduce((acc: string[], spreadsheet) => {
      const headers = spreadsheet.getXlsx().getHeader()
      return [...acc, ...headers]
    }, [])
  }

  public isValid(): boolean {
    return this.spreadsheets.every((spreadsheet) => {
      return spreadsheet.isValid()
    })
  }

  public length(): number {
    return this.spreadsheets.length
  }

  public normalizeSpreadsheets(key: string): Record<string, string>[] {
    const cadastroNormalized = this.spreadsheets[0].normalizeJsonData()
    const inventarioNormalized = this.spreadsheets[1].normalizeJsonData()
    const joined = inventarioNormalized.map((row) => {
      const cadastroRow = cadastroNormalized.find(
        (cadastroRow) => cadastroRow[key] === row[key],
      )
      if (cadastroRow) {
        return structuredClone({ ...row, ...cadastroRow })
      }
      return structuredClone(row)
    })
    return joined
  }
}
