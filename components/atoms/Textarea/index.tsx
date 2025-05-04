import { handleClasses } from '@/utils/handleClasses'
import { TextareaHTMLAttributes } from 'react'
import style from './textarea.module.scss'
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
}
export const Textarea = ({ ...rest }: TextareaProps) => {
  const filteredClasses = handleClasses([style.textarea, rest.className || ''])
  return <textarea {...rest} className={filteredClasses} />
}
