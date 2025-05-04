'use server'
import path from 'path'
import { readFile, writeFile } from './file'
const filePath = path.join('./', 'database', 'users.json')
export const setUser = async (user: any) => {
  try {
    let data = []
    const fileContent = await readFile(filePath)
    data = JSON.parse(fileContent)
    const index = data.findIndex((u: any) => u.email === user.email)
    if (index !== -1) {
      throw new Error('Usuário já existe')
    }
    let newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      terms: user.terms === 'on' ? true : false,
      createdAt: new Date().toISOString(),
    }
    data.push(newUser)
    await writeFile(filePath, data)
    return newUser
  } catch (err) {
    return {
      error: 'Erro ao cadastrar usuário!',
      message: (err as Error).message,
    }
  }
}
