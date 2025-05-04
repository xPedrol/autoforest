import { Input } from '@/components/atoms/Input'
import style from './login.module.scss'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'
export default function Entrar() {
  return (
    <main>
      <div className={style.container}>
        <h1>Entrar</h1>
        <form action="">
          <Input type="text" placeholder="Digite seu email..." />
          <Input type="password" placeholder="Digite sua senha..." />
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
