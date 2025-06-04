import { ChevronDown } from 'lucide-react'
import style from './faqItem.module.scss'
import { useRef } from 'react'
type FaqItemProps = {
  question: string
  answer: string
}
export const FaqItem = ({ question, answer }: FaqItemProps) => {
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
    <div className={style.faqItem}>
      <div className={style.columnItemHeader} onClick={openDescription}>
        <div className={style.columnItemHeaderText}>
          <h4>{question}</h4>
        </div>
        <ChevronDown ref={chevronRef} />
      </div>
      <div
        className={style.columnItemDescription}
        ref={descriptionRef}
        dangerouslySetInnerHTML={{ __html: answer }}
      ></div>
    </div>
  )
}
