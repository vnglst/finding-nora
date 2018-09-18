import * as React from 'react'
import BackgroundImage from 'shared/components/BackgroundImage'
import dog from './charles-deluvio-628935-unsplash.jpg'

// credits image: Photo by Charles Deluvio 🇵🇭🇨🇦 on Unsplash

const App = () => (
  <BackgroundImage imageSrc={dog}>
    <div className="app">
      <h1>RED</h1>
    </div>
  </BackgroundImage>
)

export default App
