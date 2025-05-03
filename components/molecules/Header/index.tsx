import Link from 'next/link'
import style from './Header.module.scss'
export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.logo}>
          <p>Auto Forest</p>
        </div>
        <nav className={style.navbar}>
          <Link href="/">Home</Link>
          <Link href="#about">Sobre</Link>
          <Link href="#goals">Objetivos</Link>
          <Link href="#motivation">Motivação</Link>
          <Link href="#plans">Planos</Link>
          <Link href="#contact">Contato</Link>
        </nav>
      </div>
    </header>
  )
}
