// tslint:disable:no-console
function BufferLoader(context, urlList, callback) {
  this.context = context
  this.urlList = urlList
  this.onload = callback
  this.bufferList = []
  this.loadCount = 0
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  const loader = this
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      loader.context.decodeAudioData(
        buffer,
        decodedData => {
          if (!decodedData) {
            console.error('error decoding file data: ' + url)
            return
          }
          loader.bufferList[index] = decodedData
          if (++loader.loadCount === loader.urlList.length) {
            loader.onload(loader.bufferList)
          }
        },
        error => {
          console.error('decodeAudioData error', error)
        },
      )
    })
    .catch(error => console.error('BufferLoader: XHR error'))
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i) {
    this.loadBuffer(this.urlList[i], i)
  }
}

export default BufferLoader
