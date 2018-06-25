import BufferLoader from './buffer-loader'

const context: AudioContext = new ((window as any).AudioContext ||
  (window as any).webkitAudioContext)()

export const loadAudioUrls = (
  urls: string[],
  finishedLoading: (bufferList: AudioBuffer[]) => void,
) => {
  const bufferLoader = new BufferLoader(context, urls, finishedLoading)
  bufferLoader.load()
}

export const playAudio = (buffer: AudioBuffer, time?: number) => {
  const source = context.createBufferSource()
  source.buffer = buffer
  source.connect(context.destination)
  source.start(time)
}
