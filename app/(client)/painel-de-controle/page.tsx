import { Card } from '@/components/atoms/Card'
import style from './dashboard.module.scss'
export default function Dashboard() {
  return (
    <main className="mainContainer">
      <section className={style.titleSection}>
        <h1>Dashboard</h1>
        <p>Encontre abaixo nossos principais produtos e serviços.</p>
      </section>
      <div className={style.cardsContainer}>
        <Card
          title="Analise de dados"
          description="Submeta sua planilha excel e receba uma analise completa de seus dados."
          buttonText="Teste agora"
          href="/analise-de-dados"
        />
      </div>
    </main>
  )
}
