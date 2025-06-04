'use server'
import { fetchApi } from './api'

export async function registerUser(data: any) {
  return await fetchApi('/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function loginUser(data: any) {
  return fetchApi('/login_json', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
