import * as qs from 'qs'
import * as React from 'react'
import './App.css'
import Game from './components/Game/'

const query = qs.parse(location.search.substr(1).toLowerCase())
const SOLUTION = (query.name || 'NORA').toUpperCase()
const NOISE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <p>{SOLUTION}</p>
        <Game size={5} solution={SOLUTION.split('')} noise={NOISE} />
      </div>
    )
  }
}

export default App
