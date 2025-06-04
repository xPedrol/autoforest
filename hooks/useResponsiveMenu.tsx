import { useEffect, useState } from 'react'
type Menu = {
  style: {
    readonly [key: string]: string
  }
}
export const useResponsiveMenu = ({ style }: Menu) => {
  const [burgerMenuOpened, setBurgerMenuOpened] = useState(false)
  const toggleMenu = () => {
    const burgerMenu = document.querySelector(`.${style.burgerMenu}`)
    const header = document.querySelector(`.${style.header}`)
    if (!burgerMenu) return
    setBurgerMenuOpened(burgerMenu.classList.toggle(style.inView))
    header?.classList.toggle(style.background)
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

  return {
    burgerMenuOpened,
    toggleMenu,
    setBurgerMenuOpened,
  }
}
