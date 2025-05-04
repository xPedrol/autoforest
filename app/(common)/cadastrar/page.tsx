'use client'
import { Input } from '@/components/atoms/Input'
import style from './signin.module.scss'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'
import { setUser } from '@/actions/user'
import { useRouter } from 'next/navigation'
export default function Cadastrar() {
  const router = useRouter()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    try {
      const res = await setUser(Object.fromEntries(formData.entries()))
      if ('error' in res) {
        throw new Error(res.message)
      }
      router.push('/entrar?signin=true')
    } catch (err) {
      alert(String(err))
    }
  }
  return (
    <main>
      <div className={style.container}>
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
  )
}
