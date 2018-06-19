// tslint:disable:no-console
import HomeIcon from '@material-ui/icons/Home'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import BottomBar from '../components/UI/BottomBar'

import * as React from 'react'
// import Game from '../components/Game/'
import './App.css'

export interface IAppProps {
  size: number
  solution: string
  noise: string
  currentScreen: string
  onNavigate: (screen: string) => void
}

function App({ solution, size, noise, currentScreen, onNavigate }: IAppProps) {
  console.log('game state', solution, size, noise)
  return (
    <div>
      <div className="background-image" />
      <div className="app">
        {/* {currentScreen === 'home' && <Game />} */}
        <BottomBar value={currentScreen} onChange={onNavigate}>
          <BottomBar.Item label="Home" value="home" icon={<HomeIcon />} />
          <BottomBar.Item
            label="New Game"
            value="new-game"
            icon={<RefreshIcon />}
          />
          <BottomBar.Item
            label="Settings"
            value="settings"
            icon={<SettingsIcon />}
          />
        </BottomBar>
      </div>
    </div>
  )
}

export default App
