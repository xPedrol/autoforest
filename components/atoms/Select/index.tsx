import { SelectHTMLAttributes } from 'react'
import style from './select.module.scss'
import { handleClasses } from '@/utils/handleClasses'

type SelectSize = 'large' | 'medium' | 'small'
type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  format?: SelectSize
}
export const Select = ({ format, ...rest }: SelectProps) => {
  const filteredClasses = handleClasses([
    style.select,
    style[format || 'medium'],
    rest.className || '',
  ])
  return <select {...rest} className={filteredClasses} />
}
