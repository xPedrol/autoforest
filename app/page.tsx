'use client'
import Image from 'next/image'
import style from './page.module.scss'
import banner from '@/public/images/tree.png'
import tree from '@/public/images/tree.png'
import { useEffect } from 'react'
export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(entry)
          if (entry.isIntersecting) {
            if (!entry.target.classList.contains(style.inView))
              entry.target.classList.add(style.inView)
            console.log('Section is in view')
          }
        })
      },
      {
        threshold: 0.45,
      },
    )
    const sections = [
      ...document.querySelectorAll(`.${style.goalsSection}`),
      ...document.querySelectorAll(`.${style.tree}`),
      ...document.querySelectorAll(`.${style.tree2}`),
      ...document.querySelectorAll(`.${style.cmSection}`),
      ...document.querySelectorAll(`.${style.infoSection}`),
      ...document.querySelectorAll(`.${style.contactSection}`),
    ]
    sections.forEach((section) => {
      observer.observe(section)
    })
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])
  return (
    <main className="mainContainer">
      <section className={style.bannerSection}>
        <div>
          <h1 className={style.title}>
            Mussum Ipsum, cacilds vidis litro abertis.
          </h1>
          <p>
            Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie
            leo, vitae iaculis nisl. Cevadis im ampola pa arma uma pindureta.
            Leite de capivaris, leite de mula manquis sem cabeça.
          </p>
        </div>
        <div className={style.imageContainer}>
          <Image
            src={banner}
            alt="Banner Image"
            width={banner.width}
            height={banner.height}
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
      <section className={style.cmSection} id="motivation">
        <Image
          className={style.tree}
          src={tree}
          alt="Tree Image"
          width={tree.width}
          height={tree.height}
        />
        <Image
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
        <div className={style.card}>
          <h2>Card Title</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className={style.button}>Learn More</button>
        </div>
        <div className={style.card}>
          <h2>Card Title</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className={style.button}>Learn More</button>
        </div>
        <div className={style.card}>
          <h2>Card Title</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className={style.button}>Learn More</button>
        </div>
      </section>
      <section className={style.contactSection} id="contact">
        <div className={style.contactSectionHeader}>
          <h2 className={style.title}>Entre em contato</h2>
          <p>Preencha o formulário abaixo</p>
        </div>
        <form>
          <input type="text" placeholder="Seu nome" required />
          <input type="email" placeholder="Seu email" required />
          <textarea rows={4} placeholder="Sua mensagem" required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </section>
    </main>
  )
}
