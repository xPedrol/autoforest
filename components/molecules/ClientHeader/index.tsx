'use client'
import Link from 'next/link'
import style from './clientHeader.module.scss'
import { AlignJustify, X } from 'lucide-react'
import { useResponsiveMenu } from '@/hooks/useResponsiveMenu'

const NavbarItems = () => {
  return (
    <>
      <Link href="/dashboard" className={style.navLink}>
        Dashboard
      </Link>
      <Link href="/analise-de-dados" className={style.navLink}>
        Analisar Planilha
      </Link>
      {/* <div className={style.profile}>
        <p className={style.profileName}>Nome do Usuário</p>/
        <Link href="/logout" className={style.profileLogout}>
          Deslogar
        </Link>
      </div> */}
    </>
  )
}
export default function ClientHeader() {
  const { toggleMenu, burgerMenuOpened } = useResponsiveMenu({ style })
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.logo}>
          <Link href="/">Auto Forest</Link>
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
