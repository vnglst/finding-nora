import HomeIcon from '@material-ui/icons/Home'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import * as React from 'react'
import { INavigationState } from '../../types'
import Game from '../Game/'
import AboutPage from '../Pages/About'
import SettingsPage from '../Pages/Settings'
import BottomBar from '../UI/BottomBar'
import Button from '../UI/Button'
import Overlay from '../UI/Overlay'
import './App.css'

interface IAppProps {
  navigation: INavigationState
  didWin: boolean
  didLoose: boolean
  remainingSolution: string[]
  updateSolution: (solution: string[]) => void
  onNavigate: (screen: string) => void
  restart: () => void
}

const App = ({
  didWin,
  didLoose,
  navigation,
  updateSolution,
  onNavigate,
  restart,
  remainingSolution,
}: IAppProps) => (
  <div>
    <div className="background-image" />
    <div className="app">
      <p>{remainingSolution}</p>
      <Game />
      <BottomBar value={navigation.currentScreen} onChange={onNavigate}>
        <BottomBar.Item value="home" icon={<HomeIcon />} />
        <BottomBar.Item value="new-game" icon={<RefreshIcon />} />
        <BottomBar.Item value="settings" icon={<SettingsIcon />} />
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
        <SettingsPage
          solution={remainingSolution}
          updateSolution={updateSolution}
          restart={restart}
          onNavigate={onNavigate}
        />
      )}
      {navigation.currentScreen === 'about' && (
        <AboutPage
          onClose={() => {
            onNavigate('settings')
          }}
        />
      )}
      {didWin &&
        navigation.currentScreen === 'home' && (
          <Overlay>
            <p>YOU WON</p>
            <Button onMouseDown={restart}>Play again?</Button>
          </Overlay>
        )}

      {didLoose &&
        navigation.currentScreen === 'home' && (
          <Overlay>
            <p>YOU LOST</p>
            <Button onMouseDown={restart}>Play again?</Button>
          </Overlay>
        )}
    </div>
  </div>
)

export default App
