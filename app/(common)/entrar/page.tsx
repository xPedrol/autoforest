'use client'
import { Input } from '@/components/atoms/Input'
import style from './login.module.scss'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Check } from 'lucide-react'
import { Alert } from '@/components/atoms/Alert'
import { Suspense } from 'react'
const AlertWrapper = () => {
  const params = useSearchParams()
  const signin = params.get('signin') === 'true'
  return (
    <>
      {signin && (
        <Alert
          icon={<Check size={32} />}
          color="green"
          description="Você se cadastrou com sucesso! Faça login para continuar."
        />
      )}
    </>
  )
}
export default function Entrar() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log(Object.fromEntries(formData.entries()))
  }
  return (
    <main>
      <div className={style.container}>
        <Suspense>
          <AlertWrapper />
        </Suspense>
        <h1>Entrar</h1>
        <form onSubmit={handleSubmit}>
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
          <Link href="/recuperar-senha" className={style.link}>
            Esqueci minha senha
          </Link>
          <Button type="submit">Enviar</Button>
        </form>
        <Link href="/cadastrar" className={style.link}>
          Não tem uma conta? Cadastre-se
        </Link>
      </div>
    </main>
  )
}
