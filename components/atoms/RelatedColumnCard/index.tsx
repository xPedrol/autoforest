/* eslint-disable react/no-unescaped-entities */
import { ChevronDown } from 'lucide-react'
import style from './relatedColumnCard.module.scss'
import { useRef } from 'react'
type Props = {
  systemHeader: string
  providedHeader: string
}
export const RelatedColumnCard = ({ systemHeader, providedHeader }: Props) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const chevronRef = useRef<SVGSVGElement>(null)
  const openDescription = () => {
    if (descriptionRef.current) {
      descriptionRef.current.classList.toggle(style.open)
    }
    if (chevronRef.current) {
      chevronRef.current.classList.toggle(style.open)
    }
  }
  return (
    <article className={style.columnItem}>
      <div className={style.columnItemHeader} onClick={openDescription}>
        <h4>{systemHeader}</h4>
        <ChevronDown ref={chevronRef} />
      </div>
      <p className={style.columnItemDescription} ref={descriptionRef}>
        <strong>Descrição da coluna:</strong> Lorem Ipsum is simply dummy text
        of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown
        printer took a galley of type and scrambled it to make a type specimen
        book. It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was
        popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software
        like Aldus PageMaker including versions of Lorem Ipsum.
      </p>

      <p className={style.relatedColumn}>
        Coluna semelhante na planilha: <strong>{providedHeader}</strong> - Caso
        necessário, escolha uma coluna mais adequada.
      </p>
    </article>
  )
}
