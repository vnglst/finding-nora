let preLastTouchStartAt = 0
let lastTouchStartAt = 0
const delay = 500

const preventDoublTapZoom = () => {
  document.addEventListener('touchstart', () => {
    preLastTouchStartAt = lastTouchStartAt
    lastTouchStartAt = +new Date()
  })

  document.addEventListener('touchend', event => {
    const touchEndAt = +new Date()
    if (
      touchEndAt - preLastTouchStartAt < delay &&
      event &&
      event.target &&
      event.target.click
    ) {
      event.preventDefault()
      event.target.click()
    }
  })
}

export default preventDoublTapZoom
