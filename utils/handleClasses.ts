export const handleClasses = (classes: string[]): string => {
  return classes.filter(Boolean).join(' ')
}
