import * as React from 'react'
import './App.css'
import Game from './components/Game/'

const SOLUTION = 'NORA'.split('')
const NOISE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <p>{SOLUTION.join('')}</p>
        <Game size={5} solution={SOLUTION} noise={NOISE} />
      </div>
    )
  }
}

export default App
