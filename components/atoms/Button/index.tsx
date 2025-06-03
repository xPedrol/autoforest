import { ButtonHTMLAttributes } from 'react'
import style from './button.module.scss'
import { handleClasses } from '@/utils/handleClasses'
type InputSize = 'large' | 'medium' | 'small'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  format?: InputSize
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'primary' | 'dark-green'
}
export const Button = ({ children, format, color, ...rest }: ButtonProps) => {
  const filteredClasses = handleClasses([
    style.button,
    style[format || 'medium'],
    style[color || 'primary'],
    rest.className || '',
  ])
  return (
    <button {...rest} className={filteredClasses}>
      {children}
    </button>
  )
}
