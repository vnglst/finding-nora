// tslint:disable:no-console
import HomeIcon from '@material-ui/icons/Home'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import BottomBar from '../components/UI/BottomBar'
import { INavigationState } from '../types'

import * as React from 'react'
import Game from '../components/Game/'
import './App.css'

export interface IAppProps {
  navigation: INavigationState
  onNavigate: (screen: string) => void
  restart: () => void
}

function App({ navigation, onNavigate, restart }: IAppProps) {
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
      </div>
    </div>
  )
}

export default App
