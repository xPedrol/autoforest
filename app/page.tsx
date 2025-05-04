'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import style from './page.module.scss'
import banner from '@/public/images/tree.webp'
import tree from '@/public/images/tree.webp'
import { typeEffect } from '@/utils/typeEffect'
import { initObserver, unobserve } from '@/utils/intersectionObserver'
import { Card } from '@/components/atoms/Card'
import { Input } from '@/components/atoms/Input'
import { Textarea } from '@/components/atoms/Textarea'
import { Button } from '@/components/atoms/Button'
const homeTitle = 'Mussum Ipsum, cacilds vidis litro abertis.'
export default function Home() {
  useEffect(() => {
    const homeTitleElement = document.getElementById('homeTitle')
    typeEffect(homeTitle, homeTitleElement)

    const sections = [
      ...document.querySelectorAll(`.${style.goalsSection}`),
      ...document.querySelectorAll(`.${style.tree}`),
      ...document.querySelectorAll(`.${style.tree2}`),
      ...document.querySelectorAll(`.${style.motivationSection}`),
      ...document.querySelectorAll(`.${style.infoSection}`),
      ...document.querySelectorAll(`.${style.contactSection}`),
    ]
    initObserver(style.inView, sections)
    return () => {
      unobserve(sections)
    }
  }, [])
  return (
    <main className="mainContainer">
      <section className={style.bannerSection}>
        <div>
          <h1 className={style.homeTitle} id="homeTitle">
            {homeTitle}
          </h1>
          <p>
            Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie
            leo, vitae iaculis nisl. Cevadis im ampola pa arma uma pindureta.
            Leite de capivaris, leite de mula manquis sem cabeça.
          </p>
        </div>
        <div className={style.imageContainer}>
          <Image
            loading="eager"
            src={banner}
            alt="Banner Image"
            width={banner.width}
            height={banner.height}
            quality={40}
          />
        </div>
      </section>
      <section className={style.aboutUsSection} id="about">
        <div>
          <h2 className={style.title}>Sobre nós</h2>
          <hr />
          <p>
            Mussum Ipsum, cacilds vidis litro abertis. Leite de capivaris, leite
            de mula manquis sem cabeça. Aenean aliquam molestie leo, vitae
            iaculis nisl. Cevadis im ampola pa arma uma pindureta.
          </p>
        </div>
      </section>
      <section className={style.goalsSection} id="goals">
        <div className={style.goalsTextContainer}>
          <div className={style.content}>
            <h2 className={style.title}>Objetivos</h2>
            <p>
              Mussum Ipsum, cacilds vidis litro abertis. Leite de capivaris,
              leite de mula manquis sem cabeça. Aenean aliquam molestie leo,
              vitae iaculis nisl. Cevadis im ampola pa arma uma pindureta.
            </p>
          </div>
        </div>
      </section>
      <section className={style.motivationSection} id="motivation">
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
              Por que <span>usar ?</span>
            </h2>
            <p>
              Mussum Ipsum, cacilds vidis litro abertis. Leite de capivaris,
              leite de mula manquis sem cabeça. Aenean aliquam molestie leo,
              vitae iaculis nisl. Cevadis im ampola pa arma uma pindureta.
            </p>
          </div>
        </div>
      </section>
      <section className={style.infoSection} id="plans">
        <div className={style.cardAnimation}>
          <Card />
        </div>
        <div className={style.cardAnimation}>
          <Card />
        </div>
        <div className={style.cardAnimation}>
          <Card />
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
