import style from './card.module.scss'
export const Card = () => {
  return (
    <article className={`${style.card} cardForAnimation`}>
      <h2>Card Title</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <button className={style.button}>Learn More</button>
    </article>
  )
}
