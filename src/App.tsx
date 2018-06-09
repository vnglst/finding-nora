// import * as _ from 'lodash'
import * as React from 'react'
import './App.css'
import Grid from './components/grid/'

const SOLUTION = 'NORA'.split('')
const NOISE = 'NORABCDEFGHIJKL'.split('')

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Grid size={4} solution={SOLUTION} noise={NOISE} />
      </div>
    )
  }
}

export default App
