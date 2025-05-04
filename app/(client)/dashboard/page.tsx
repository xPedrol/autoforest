import { Card } from '@/components/atoms/Card'
import style from './dashboard.module.scss'
export default function Dashboard() {
  return (
    <main className="mainContainer">
      <section className={style.titleSection}>
        <h1>Dashboard</h1>
        <p>
          Welcome to the dashboard! Here you can manage your settings and view
          your data.
        </p>
      </section>
      <div className={style.cardsContainer}>
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  )
}
