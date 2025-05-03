export const typeEffect = (
  text: string,
  homeTitleElement: HTMLElement | null | undefined,
) => {
  if (!homeTitleElement) return
  homeTitleElement.textContent = ''
  homeTitleElement.style.setProperty('opacity', '1')
  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      if (homeTitleElement) {
        homeTitleElement.innerHTML += text.charAt(i)
      }
    }, 40 * i)
  }
}
