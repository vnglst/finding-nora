import BufferLoader from './buffer-loader'

const AudioContext = window.AudioContext || window.webkitAudioContext
const context = new AudioContext()

export function loadAudioUrls(urls, finishedLoading) {
  const bufferLoader = new BufferLoader(context, urls, finishedLoading)
  bufferLoader.load()
}

export function playAudio(buffer, time) {
  var source = context.createBufferSource()
  source.buffer = buffer
  source.connect(context.destination)
  source.start(time)
}
