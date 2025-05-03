export const initObserver = (className: string, sections: Element[]) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!entry.target.classList.contains(className))
            entry.target.classList.add(className)
        }
      })
    },
    {
      threshold: 0.45,
    },
  )
  sections.forEach((section) => {
    observer.observe(section)
  })
}

export const unobserve = (sections: Element[]) => {
  const observer = new IntersectionObserver(() => {})
  sections.forEach((section) => {
    observer.unobserve(section)
  })
}
