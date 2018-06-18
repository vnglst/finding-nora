let preLastTouchStartAt = 0
let lastTouchStartAt = 0
const delay = 500

const preventDoubleTapZoom = () => {
  document.addEventListener('touchstart', () => {
    preLastTouchStartAt = lastTouchStartAt
    lastTouchStartAt = +new Date()
  })

  document.addEventListener('touchend', (event: TouchEvent) => {
    const touchEndAt = +new Date()
    const target = event.target as HTMLElement
    if (
      touchEndAt - preLastTouchStartAt < delay &&
      event &&
      target &&
      target.click
    ) {
      event.preventDefault()
      target.click()
    }
  })
}

export default preventDoubleTapZoom
