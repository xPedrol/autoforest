import { ButtonHTMLAttributes } from 'react'
import style from './button.module.scss'
import { handleClasses } from '@/utils/handleClasses'
type InputSize = 'large' | 'medium' | 'small'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  format?: InputSize
}
export const Button = ({ children, format, ...rest }: ButtonProps) => {
  const filteredClasses = handleClasses([
    style.button,
    style[format || 'medium'],
    rest.className || '',
  ])
  return (
    <button {...rest} className={filteredClasses}>
      {children}
    </button>
  )
}
