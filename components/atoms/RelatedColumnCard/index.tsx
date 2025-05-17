import style from './relatedColumnCard.module.scss'
import { useRef, useState } from 'react'
import { Select } from '../Select'
import { IRelatedColumn } from '@/types/relatedColumn'
type Props = {
  item: IRelatedColumn
  description: string
  columns: string[]
}
export const RelatedColumnCard = ({ item, description, columns }: Props) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const chevronRef = useRef<SVGSVGElement>(null)
  const setUpdateTimes = useState(0)[1]
  const openDescription = () => {
    if (descriptionRef.current) {
      descriptionRef.current.classList.toggle(style.open)
    }
    if (chevronRef.current) {
      chevronRef.current.classList.toggle(style.open)
    }
  }
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    item.client = event.target.value
    setUpdateTimes((prev) => prev + 1)
  }
  return (
    <article className={style.columnItem}>
      <div className={style.columnItemHeader} onClick={openDescription}>
        <div className={style.columnItemHeaderText}>
          <h4>
            <span>Sistema:</span> {item.system}
          </h4>
        </div>
      </div>
      <p className={style.columnItemDescription} ref={descriptionRef}>
        <strong>Descrição da coluna do sistema:</strong> {description}
      </p>
      <div className={style.selectContainer}>
        <Select value={item.client} onChange={handleSelectChange}>
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
