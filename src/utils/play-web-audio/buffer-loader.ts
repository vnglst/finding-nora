class BufferLoader {
  public context: AudioContext
  public urlList: string[]
  public onload: (bufferList: AudioBuffer[]) => void
  public bufferList: AudioBuffer[]
  public loadCount: number

  constructor(
    context: AudioContext,
    urlList: string[],
    callback: (bufferList: AudioBuffer[]) => void,
  ) {
    this.context = context
    this.urlList = urlList
    this.onload = callback
    this.bufferList = []
    this.loadCount = 0
  }

  public load() {
    this.urlList.forEach((url, i) => this.loadBuffer(url, i))
  }

  private loadBuffer(url: string, index: number) {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        this.context.decodeAudioData(
          buffer,
          decodedData => {
            if (!decodedData) {
              console.error('error decoding file data: ' + url)
              return
            }
            this.bufferList[index] = decodedData
            if (++this.loadCount === this.urlList.length) {
              this.onload(this.bufferList)
            }
          },
          error => {
            console.error('decodeAudioData error', error)
          },
        )
      })
      .catch(error => console.error('BufferLoader: XHR error'))
  }
}

export default BufferLoader
