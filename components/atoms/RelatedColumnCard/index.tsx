import style from './relatedColumnCard.module.scss'
import { useRef } from 'react'
import { Select } from '../Select'
type Props = {
  systemHeader: string
  providedHeader: string
  description: string
  columns: string[]
}
export const RelatedColumnCard = ({
  systemHeader,
  providedHeader,
  description,
  columns,
}: Props) => {
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
        <div className={style.columnItemHeaderText}>
          <h4>
            <span>Sistema:</span> {systemHeader}
          </h4>
        </div>
        {/* <Plus ref={chevronRef} /> */}
      </div>
      <p className={style.columnItemDescription} ref={descriptionRef}>
        <strong>Descrição da coluna do sistema:</strong> {description}
      </p>
      <div className={style.selectContainer}>
        <Select defaultValue={providedHeader}>
          <option value="" disabled>
            Selecione a coluna relacionada na sua planilha
          </option>
          {columns.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </div>
    </article>
  )
}
