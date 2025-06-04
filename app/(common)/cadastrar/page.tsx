'use client'
import { Input } from '@/components/atoms/Input'
import style from './signin.module.scss'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/configs/requests'
import { useState } from 'react'
import { Alert } from '@/components/atoms/Alert'
import { Check } from 'lucide-react'
import Header from '@/components/molecules/Header'

export default function Cadastrar() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    try {
      debugger
      if (formData.get('password') !== formData.get('passwordConfirmation')) {
        throw new Error('As senhas não conferem.')
      }
      const res = await registerUser({
        nome: formData.get('name') as string,
        email: formData.get('email') as string,
        senha: formData.get('password') as string,
      })
      console.log('res', res)
      if ('error' in res) {
        throw new Error(res.error.message)
      }
      router.push('/entrar?signin=true')
    } catch (err) {
      setError(String(err))
    }
  }
  return (
    <>
      <Header />
      <main>
        <div className={style.container}>
          {error && (
            <Alert icon={<Check size={32} />} color="red" description={error} />
          )}
          <h1>Cadastrar</h1>
          <form onSubmit={handleSubmit}>
            <Input
              name="name"
              type="text"
              placeholder="Digite seu nome..."
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Digite seu email..."
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Digite sua senha..."
              required
            />
            <Input
              name="passwordConfirmation"
              type="password"
              placeholder="Confirme sua senha..."
              required
            />

            <div className={style.checkboxContainer}>
              <Input name="terms" type="checkbox" id="termos" required />
              <label htmlFor="termos">
                Aceitar{' '}
                <Link href="/termos-de-uso" className={style.terms}>
                  termos de uso
                </Link>
              </label>
            </div>
            <Button type="submit">Enviar</Button>
          </form>
          <Link href="/entrar" className={style.link}>
            Já tem uma conta? Entre
          </Link>
        </div>
      </main>
    </>
  )
}
