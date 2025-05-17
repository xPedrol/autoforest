import { Row } from 'read-excel-file'
export interface IXlsx {
  getHeader(): string[]
  getRows(): Row[]
  getJsonData(): Record<string, string>[]
  setHeader(header: string[]): void
  setRows(rows: Row[]): void
}
export class Xlsx implements IXlsx {
  public file: File | null = null
  private header: string[]
  private rows: Row[]
  private jsonData: Record<string, string>[]

  constructor(header: string[] = [], rows: Row[] = []) {
    this.header = header
    this.rows = rows
    this.jsonData = []
  }

  public getHeader(): string[] {
    return this.header
  }

  public getRows(): Row[] {
    return this.rows
  }

  public getJsonData(): Record<string, string>[] {
    return this.jsonData
  }

  public setHeader(header: string[]): void {
    this.header = header
  }

  public setRows(rows: Row[]): void {
    this.rows = rows
    this.setHeader(this.rows[0] as string[])
    this.generateJsonData()
  }

  private generateJsonData(): void {
    const cols = this.header
    this.jsonData = this.rows
      .slice(1, 4)
      .map((row) =>
        cols.reduce((obj, col, i) => ({ ...obj, [col]: row[i] }), {}),
      )
  }
}
