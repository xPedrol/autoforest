'use client'
import Link from 'next/link'
import style from './header.module.scss'
import { AlignJustify, X } from 'lucide-react'
import { useResponsiveMenu } from '@/hooks/useResponsiveMenu'
const NavbarItems = () => {
  return (
    <>
      <Link href="/" className={style.navLink}>
        Home
      </Link>
      <Link href="/#about" className={style.navLink}>
        Sobre
      </Link>
      <Link href="/#goals" className={style.navLink}>
        Objetivos
      </Link>
      <Link href="/#motivation" className={style.navLink}>
        Motivação
      </Link>
      <Link href="/#plans" className={style.navLink}>
        Planos
      </Link>
      <Link href="/#contact" className={style.navLink}>
        Contato
      </Link>
      <Link href="/entrar" prefetch={false} className={style.navLink}>
        Area do cliente
      </Link>
    </>
  )
}
export default function Header() {
  const { toggleMenu, burgerMenuOpened } = useResponsiveMenu()
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.logo}>
          <p>Auto Forest</p>
        </div>
        <div className={style.burger} onClick={toggleMenu}>
          {!burgerMenuOpened ? <AlignJustify size={32} /> : <X size={32} />}
        </div>
        <nav className={style.navbar}>
          <NavbarItems />
        </nav>
      </div>
      <div className={style.burgerMenu}>
        <NavbarItems />
      </div>
    </header>
  )
}
