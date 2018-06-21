// tslint:disable:no-console
import HomeIcon from '@material-ui/icons/Home'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import BottomBar from '../components/UI/BottomBar'
import Button from '../components/UI/Button'
import Overlay from '../components/UI/Overlay'
import { INavigationState } from '../types'

import * as React from 'react'
import Game from '../components/Game/'
import './App.css'

export interface IAppProps {
  navigation: INavigationState
  didWin: boolean
  onNavigate: (screen: string) => void
  restart: () => void
}

function App({ didWin, navigation, onNavigate, restart }: IAppProps) {
  return (
    <div>
      <div className="background-image" />
      <div className="app">
        <button onClick={restart}>restart</button>
        {navigation.currentScreen === 'home' && <Game />}
        <BottomBar value={navigation.currentScreen} onChange={onNavigate}>
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
        {didWin && (
          <Overlay>
            <p>YOU WON</p>
            <Button onMouseDown={restart}>Play again?</Button>
          </Overlay>
        )}
      </div>
    </div>
  )
}

export default App
