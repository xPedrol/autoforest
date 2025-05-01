import style from './Header.module.scss'
export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.logo}>
          <p>Auto Forest</p>
        </div>
        <nav className={style.navbar}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
