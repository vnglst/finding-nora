// tslint:disable:no-console
import HomeIcon from '@material-ui/icons/Home'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import * as React from 'react'
import { INavigationState } from '../../types'
import Game from '../Game/'
import Settings from '../Settings'
import BottomBar from '../UI/BottomBar'
import Button from '../UI/Button'
import Overlay from '../UI/Overlay'
import './App.css'

export interface IAppProps {
  navigation: INavigationState
  didWin: boolean
  solution: string[]
  updateSolution: (solution: string[]) => void
  onNavigate: (screen: string) => void
  restart: () => void
}

function App({
  didWin,
  navigation,
  updateSolution,
  onNavigate,
  restart,
  solution,
}: IAppProps) {
  return (
    <div>
      <div className="background-image" />
      <div className="app">
        <Game />
        <BottomBar value={navigation.currentScreen} onChange={onNavigate}>
          <BottomBar.Item
            value="home"
            icon={<HomeIcon style={{ fontSize: '28px' }} />}
          />
          <BottomBar.Item
            value="new-game"
            icon={<RefreshIcon style={{ fontSize: '28px' }} />}
          />
          <BottomBar.Item
            value="settings"
            icon={<SettingsIcon style={{ fontSize: '28px' }} />}
          />
        </BottomBar>
        {navigation.currentScreen === 'new-game' && (
          <Overlay>
            <Button
              onMouseDown={() => {
                restart()
                onNavigate('home')
              }}
            >
              New game
            </Button>
            <Button
              onMouseDown={() => {
                onNavigate('home')
              }}
            >
              Resume game
            </Button>
          </Overlay>
        )}
        {navigation.currentScreen === 'settings' && (
          <Settings
            solution={solution}
            updateSolution={updateSolution}
            restart={restart}
            onNavigate={onNavigate}
          />
        )}

        {didWin &&
          navigation.currentScreen === 'home' && (
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
