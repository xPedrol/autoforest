import { AnchorButton } from '../AnchorButton'
import style from './card.module.scss'
type CardProps = {
  title: string
  description: string
  buttonText: string
  href?: string
}
export const Card = ({ title, description, buttonText, href }: CardProps) => {
  return (
    <article className={`${style.card}`}>
      <h2>{title}</h2>
      <p>{description}</p>
      {href && (
        <AnchorButton format="small" href={href} className={style.link}>
          {buttonText}
        </AnchorButton>
      )}
    </article>
  )
}
