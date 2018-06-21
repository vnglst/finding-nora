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
        {navigation.currentScreen === 'new-game' && (
          <Overlay>
            <p>New game</p>
            <Button
              onMouseDown={() => {
                onNavigate('home')
              }}
            >
              Resume game
            </Button>
            <Button
              onMouseDown={() => {
                restart()
                onNavigate('home')
              }}
            >
              New game
            </Button>
            <Button disabled={true}>Restart game</Button>
          </Overlay>
        )}
        {navigation.currentScreen === 'settings' && (
          <Overlay>
            <p>Settings</p>
            <input
              type="text"
              name="solution"
              onBlur={e => {
                const newSolution = e.target.value.toUpperCase().split('')
                if (newSolution.length > 2 && newSolution.length < 10) {
                  updateSolution(newSolution)
                }
              }}
            />
            <Button
              onClick={() => {
                restart()
                onNavigate('home')
              }}
            >
              Save
            </Button>
          </Overlay>
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
