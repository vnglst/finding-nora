import BufferLoader from './bufferLoader'

const AudioContext = window.AudioContext || window.webkitAudioContext
const context = new AudioContext()

export function loadSounds(urls, finishedLoading) {
  const bufferLoader = new BufferLoader(context, urls, finishedLoading)
  bufferLoader.load()
}

export function playSound(buffer, time) {
  var source = context.createBufferSource()
  source.buffer = buffer
  source.connect(context.destination)
  source.start(time)
}
