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
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
