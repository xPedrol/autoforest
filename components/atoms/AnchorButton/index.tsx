import style from './anchorButton.module.scss'
import { handleClasses } from '@/utils/handleClasses'
import Link, { LinkProps } from 'next/link'
type InputSize = 'large' | 'medium' | 'small'
type AnchorProps = LinkProps & {
  children: React.ReactNode
  format?: InputSize
  className?: string
}
export const AnchorButton = ({ children, format, ...rest }: AnchorProps) => {
  const filteredClasses = handleClasses([
    style.anchor,
    style[format || 'medium'],
    rest.className || '',
  ])
  return (
    <Link {...rest} className={filteredClasses}>
      {children}
    </Link>
  )
}
