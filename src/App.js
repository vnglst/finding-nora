import * as React from 'react'
import 'wired-elements'
import './App.css'
import Grid from './components/grid/'

const SOLUTION = 'NORA'.split('')
const NOISE = 'BCDEFGHIJKLM'.split('')

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <Grid size={4} solution={SOLUTION} noise={NOISE} />
      </div>
    )
  }
}

export default App
