import Image from 'next/image'
import style from './page.module.scss'
import banner from '@/public/images/tree.png'
import tree from '@/public/images/tree.png'
export default function Home() {
  return (
    <main className="mainContainer">
      <section className={style.bannerSection}>
        <div className={style.textContainer}>
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
      <section className={style.aboutUsSection}>
        <div className={style.textContainer}>
          <h2 className={style.title}>Sobre nós</h2>
          <hr />
          <p>
            Mussum Ipsum, cacilds vidis litro abertis. Leite de capivaris, leite
            de mula manquis sem cabeça. Aenean aliquam molestie leo, vitae
            iaculis nisl. Cevadis im ampola pa arma uma pindureta.
          </p>
        </div>
      </section>
      <section className={style.goalsSection}>
        <div className={style.textContainer}>
          <div className={style.padding}></div>
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
      <section className={style.cmSection}>
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
        <div className={style.textContainer}>
          <div className={style.padding}></div>
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
      <section className={style.infoSection}>
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
    </main>
  )
}
