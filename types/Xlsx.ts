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

  public getFile(): File{
    if (!this.file) {
      throw new Error('File is not set')
    }
    return this.file
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
      .slice(1, this.rows.length)
      .map((row) =>
        cols.reduce((obj, col, i) => ({ ...obj, [col]: row[i] }), {}),
      )
  }

  public normalizeJsonData(map: Map<string, string>): Record<string, string>[] {
    return this.jsonData.map((row) => {
      const newRow: Record<string, string> = {}
      for (const [client, system] of map.entries()) {
        newRow[system] = row[client]
      }
      return newRow
    })
  }
}
