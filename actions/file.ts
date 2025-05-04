import { promises as fs } from 'fs'
export const readFile = async (filePath: string) => {
  return fs.readFile(filePath, 'utf-8')
}

export const writeFile = async (filePath: string, data: any) => {
  return fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}
