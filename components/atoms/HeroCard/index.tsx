import Image from 'next/image'
import { AnchorButton } from '../AnchorButton'
import UserPlaceholder from '@/public/images/user.jpg'
import style from './heroCard.module.scss'
type CardProps = {
  title: string
  description: string
  buttonText: string
  href?: string
}
export const HeroCard = ({
  title,
  description,
  buttonText,
  href,
}: CardProps) => {
  return (
    <article className={`${style.card}`}>
      <div className={style.imageContainer}>
        <Image src={UserPlaceholder} alt={title} fill />
      </div>
      <div className={style.content}>
        <h3>{title}</h3>
        <p>{description}</p>
        {href && (
          <AnchorButton format="small" href={href} className={style.link}>
            {buttonText}
          </AnchorButton>
        )}
      </div>
    </article>
  )
}
