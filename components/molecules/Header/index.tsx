'use client'
import Link from 'next/link'
import style from './header1.module.scss'
import { AlignJustify, X } from 'lucide-react'
import { useEffect, useState } from 'react'
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
  const [burgerMenuOpened, setBurgerMenuOpened] = useState(false)
  const toggleMenu = () => {
    const burgerMenu = document.querySelector(`.${style.burgerMenu}`)
    if (!burgerMenu) return
    setBurgerMenuOpened(burgerMenu.classList.toggle(style.inView))
  }
  useEffect(() => {
    const burgerMenu = document.querySelector(`.${style.burgerMenu}`)
    if (!burgerMenu) return
    // CLOSE MENU WHEN CLICKING OUTSIDE
    const closeMenu = (e: MouseEvent) => {
      if (burgerMenuOpened && !burgerMenu.contains(e.target as Node)) {
        setBurgerMenuOpened(false)
        burgerMenu.classList.remove(style.inView)
      }
    }
    document.addEventListener('click', closeMenu)

    // CLOSE MENU WHEN CLICKING ON A LINK
    const closeMenuByLink = (e: Event) => {
      const target = e.target as Element | null
      if (target && target.nodeName === 'A') {
        setBurgerMenuOpened(false)
        burgerMenu.classList.remove(style.inView)
      }
    }
    burgerMenu.addEventListener('click', closeMenuByLink)

    // CLOSE MENU WHEN DESTROYING COMPONENT
    return () => {
      document.removeEventListener('click', closeMenu)
      burgerMenu.removeEventListener('click', closeMenuByLink)
    }
  }, [burgerMenuOpened])
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
