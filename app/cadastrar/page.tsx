import { Input } from '@/components/atoms/Input'
import style from './signin.module.scss'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'
export default function Cadastrar() {
  return (
    <main>
      <div className={style.container}>
        <h1>Cadastrar</h1>
        <form action="">
          <Input type="text" placeholder="Digite seu nome..." />
          <Input type="text" placeholder="Digite seu email..." />
          <Input type="password" placeholder="Digite sua senha..." />
          <Input type="password" placeholder="Confirme sua senha..." />

          <div className={style.checkboxContainer}>
            <Input type="checkbox" id="termos" />
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
