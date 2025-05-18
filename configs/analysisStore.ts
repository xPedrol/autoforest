import { create } from 'zustand'
import { IAWrapper, IIAWrapper } from '@/configs/iawrapper'
import { ISpreadsheetArray, SpreadsheetArray } from '@/types/Spreadsheet'
import { CadastroColumns, Columns, InventarioColumns } from './columns'

type TIAStore = {
  iaInstance: IIAWrapper
  spreadsheets: ISpreadsheetArray
  columns: Columns[]
  fk: string
}
export const useAnalysisStore = create<TIAStore>((set) => ({
  columns: [new CadastroColumns(), new InventarioColumns()],
  iaInstance: new IAWrapper(),
  spreadsheets: new SpreadsheetArray(2),
  fk: Columns.FOREIGN_KEY,
}))
