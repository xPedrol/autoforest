'use client'
import Link from 'next/link'
import style from './clientHeader.module.scss'
import { AlignJustify, X } from 'lucide-react'
import { useResponsiveMenu } from '@/hooks/useResponsiveMenu'
import { signOut, useSession } from 'next-auth/react'
import { TreeIcon } from '@/components/atoms/Icons/Tree'

const NavbarItems = () => {
  const { data: session } = useSession()
  return (
    <>
      <Link href="/painel-de-controle" className={style.navLink}>
        Dashboard
      </Link>
      <Link href="/analise-de-dados" className={style.navLink}>
        Analisar Planilha
      </Link>
      {session?.user && (
        <div className={style.profile}>
          <p className={style.profileName}>
            {session?.user?.name || 'Usuário Desconhecido'}
          </p>
          /
          <p
            onClick={async () => await signOut()}
            className={style.profileLogout}
          >
            Deslogar
          </p>
        </div>
      )}
    </>
  )
}
export default function ClientHeader() {
  const { toggleMenu, burgerMenuOpened } = useResponsiveMenu({ style })
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.logo}>
          <Link href="/">
            <TreeIcon />
            AI Forest
          </Link>
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
