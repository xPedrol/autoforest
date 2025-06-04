'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import style from './page.module.scss'
import tree from '@/public/images/tree.webp'
import { initObserver, unobserve } from '@/utils/intersectionObserver'
import { Card } from '@/components/atoms/Card'
import { Input } from '@/components/atoms/Input'
import { Textarea } from '@/components/atoms/Textarea'
import { Button } from '@/components/atoms/Button'
import { AlarmClock, BrainCircuit, Ruler, TreePine } from 'lucide-react'
import Header from '@/components/molecules/Header'
import { FaqItem } from '@/components/atoms/FaqItem'
import { faqItems } from '@/configs/faq'
export default function Home() {
  useEffect(() => {
    const sections = [
      ...document.querySelectorAll(`.${style.goalsSection}`),
      ...document.querySelectorAll(`.${style.tree}`),
      ...document.querySelectorAll(`.${style.tree2}`),
      ...document.querySelectorAll(`.${style.motivationSection}`),
      ...document.querySelectorAll(`.${style.infoSection}`),
      ...document.querySelectorAll(`.${style.contactSection}`),
      ...document.querySelectorAll(`.${style.featuresSection}`),
      ...document.querySelectorAll(`.${style.benefitsSection}`),
      ...document.querySelectorAll(`.${style.technologySection}`),
    ]
    initObserver(style.inView, sections)
    return () => {
      unobserve(sections)
    }
  }, [])
  return (
    <main className={style.mainContainer}>
      <Header />
      <section className={style.bannerSection}>
        <div className={style.blurBlobLeft}></div>
        <div>
          <h1 className={style.homeTitle} id="homeTitle">
            AI Forest: Revolucionando o Monitoramento Florestal
          </h1>
          <p>
            Ideal para empresas que desejam otimizar o manejo florestal, reduzir
            custos operacionais e eliminar etapas manuais nos processos de
            análise.
          </p>
          <Button format="medium" type="button" color="dark-green">
            Começar agora
          </Button>
        </div>
        {/* <div className={style.imageContainer}>
          <Image
            loading="eager"
            src={banner}
            alt="Banner Image"
            width={banner.width}
            height={banner.height}
            quality={40}
            priority={true}
          />
        </div> */}
      </section>
      <section className={style.aboutUsSection} id="about">
        <div>
          <h2 className={style.title}>Automação do inventário florestal</h2>
          <hr />
          <p>
            Utilizando algoritmos de inteligência artificial como redes neurais
            artificiais (RNAs) e Random Forest, o sistema processa dados de
            campo, realiza estimativas de volume e altura e entrega relatórios
            técnicos completos — em poucos minutos.
          </p>
        </div>
      </section>
      {/* <section className={style.goalsSection} id="goals">
        <div className={style.goalsTextContainer}>
          <div className={style.content}>
            <h2 className={style.title}>Economia de tempo e recursos</h2>
            <p>
              Os métodos tradicionais de inventário florestal são complexos,
              caros e suscetíveis a erros, exigindo medições em campo,
              processamento estatístico e ferramentas especializadas — etapas
              que demandam tempo e conhecimento técnico.
            </p>
          </div>
        </div>
      </section> */}
      <section className={style.featuresSection}>
        <h2 className={style.title}>Transforme sua realidade</h2>
        <div className={style.featuresGrid}>
          <div className={style.featureCard}>
            <TreePine />
            <h3>Elimina a etapa de cubagem</h3>
            <p>
              Substituindo-a por estimativas automáticas com base em
              inteligência artificial.
            </p>
          </div>
          <div className={style.featureCard}>
            <Ruler />
            <h3>Exige apenas três alturas por parcela</h3>
            <p>
              Exige apenas três alturas por parcela, reduzindo o esforço de
              campo sem comprometer a acurácia.
            </p>
          </div>
          <div className={style.featureCard}>
            <BrainCircuit />
            <h3>Machine Learning</h3>
            <p>
              Automatiza o processamento dos dados brutos do inventário
              florestal, aplicando algoritmos robustos de machine learning para
              gerar estimativas de altura, volume e produtividade.
            </p>
          </div>
          <div className={style.featureCard}>
            <AlarmClock />
            <h3>Entrega resultados confiáveis em minutos</h3>
            <p>
              Entrega resultados confiáveis em minutos, com relatórios prontos
              para auditoria técnica e tomada de decisão.
            </p>
          </div>
        </div>
      </section>
      <section className={style.benefitsSection}>
        <div className={style.benefitsContent}>
          <h2 className={style.title}>Proposta de Valor</h2>
          <div className={style.benefitsList}>
            <div className={style.benefitItem}>
              <h3>Economia de tempo e recursos</h3>
              <p>
                Substitui planilhas e scripts manuais por uma plataforma robusta
                e intuitiva.
              </p>
            </div>
            <div className={style.benefitItem}>
              <h3>Modelos validados</h3>
              <p>
                As estimativas são baseadas em grandes bases florestais, com uso
                de inteligência artificial aplicada à silvicultura
              </p>
            </div>
            <div className={style.benefitItem}>
              <h3>Auditorias e Certificações</h3>
              <p>
                Exporte relatórios em formato técnico e pronto para integração
                com ERPs e sistemas de gestão florestal.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={style.motivationSection} id="equipe">
        <Image
          loading="lazy"
          className={style.tree}
          src={tree}
          alt="Tree Image"
          width={tree.width}
          height={tree.height}
          quality={40}
        />
        <Image
          loading="lazy"
          className={style.tree2}
          src={tree}
          alt="Tree Image"
          width={tree.width}
          height={tree.height}
        />
        <div>
          <div className={style.content}>
            <h2 className={style.title}>
              A equipe <span>AI Forest</span>
            </h2>
            <p>
              O AI Forest é o resultado da união entre pesquisa científica,
              tecnologia de dados e gestão estratégica aplicada ao setor
              florestal. A equipe fundadora da AI Forest combina expertise
              técnica, acadêmica e de mercado
            </p>
          </div>
        </div>
      </section>
      <section className={style.infoSection} id="plans">
        <div className={style.cardAnimation}>
          <Card
            title="Dr. Pablo Falco Lopes (CEO)"
            description="Pós Doutorando, Doutor e Mestre em Ciência Florestal pela Universidade Federal de Viçosa (UFV), com foco em mensuração e manejo florestal. Especialista em modelagem matemática, inteligência artificial, pesquisa operacional e análise de dados aplicados à engenharia florestal."
            buttonText="Saiba mais"
          />
        </div>
        <div className={style.cardAnimation}>
          <Card
            title="Sinara Silva P. Lopes"
            description="Economista, com especializações em controladoria, finanças e planejamento tributário. Possui ampla experiência em gestão administrativo-financeira, auditoria, implantação de sistemas de gestão (ISO) e atuação como CFO em empresas de médio porte."
            buttonText="Saiba mais"
          />
        </div>
        <div className={style.cardAnimation}>
          <Card
            title="Salim Calil Salim Neto"
            description="Engenheiro Florestal pela Universidade Federal de Viçosa (UFV), com Mestrado e Doutorado em Ciências Florestais pela Universidade Federal do Espírito Santo (UFES). Possui sólida experiência em ecologia e manejo de florestas tropicais, atuando com foco em modelagem de ecossistemas florestais, dinâmica de crescimento e estrutura."
            buttonText="Saiba mais"
          />
        </div>
        <div className={style.cardAnimation}>
          <Card
            title="Letícia Falco Lopes"
            description="Desenhista Industrial, com experiência em marketing, design estratégico, identidade visual e suporte à comunicação institucional de soluções tecnológicas."
            buttonText="Saiba mais"
          />
        </div>
      </section>
      <section className={style.faqSection} id="faqSection">
        <div className={style.faqHeader}>
          <h2 className={style.title}>Perguntas Frequentes</h2>
        </div>
        <div className={style.faqList}>
          {faqItems.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </section>
      <section className={style.contactSection} id="contact">
        <div className={style.contactSectionHeader}>
          <h2 className={style.title}>Entre em contato</h2>
          <p>Preencha o formulário abaixo</p>
        </div>
        <form>
          <Input format="large" type="text" placeholder="Seu nome" required />
          <Input format="large" type="email" placeholder="Seu email" required />
          <Textarea rows={4} placeholder="Sua mensagem" required />
          <Button format="large" type="submit">
            Enviar
          </Button>
        </form>
      </section>
    </main>
  )
}
