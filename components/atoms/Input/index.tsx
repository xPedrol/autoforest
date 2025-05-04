import { InputHTMLAttributes } from 'react'
import style from './input.module.scss'
import { handleClasses } from '@/utils/handleClasses'

type InputSize = 'large' | 'medium' | 'small'
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  format?: InputSize
}
export const Input = ({ format, ...rest }: InputProps) => {
  const filteredClasses = handleClasses([
    style.input,
    style[format || 'medium'],
    rest.className || '',
  ])
  return <input {...rest} className={filteredClasses} />
}
