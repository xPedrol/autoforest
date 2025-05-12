import style from './alert.module.scss'
import { handleClasses } from '@/utils/handleClasses'
type AlertProps = {
  icon?: React.ReactNode
  description: string
  color?: 'red' | 'green' | 'blue' | 'yellow'
}
export const Alert = ({ icon, description, color }: AlertProps) => {
  color = color || 'green'
  const classes = handleClasses([style.alert, style[color]])
  return (
    <div className={classes}>
      {icon && icon}
      <p>{description}</p>
    </div>
  )
}
