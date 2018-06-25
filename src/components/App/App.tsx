import HomeIcon from '@material-ui/icons/Home'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import * as React from 'react'
import Game from '../Game/'
import AboutPage from '../Pages/About'
import NewGamePage from '../Pages/NewGame'
import SettingsPage from '../Pages/Settings'
import BottomBar from '../UI/BottomBar'
import Button from '../UI/Button'
import Overlay from '../UI/Overlay'
import './App.css'

interface IAppProps {
  currentPage: string
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
  currentPage,
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
      <BottomBar value={currentPage} onChange={onNavigate}>
        <BottomBar.Item value="home" icon={<HomeIcon />} />
        <BottomBar.Item value="new-game" icon={<RefreshIcon />} />
        <BottomBar.Item value="settings" icon={<SettingsIcon />} />
      </BottomBar>
      {currentPage === 'new-game' && (
        <NewGamePage onNavigate={onNavigate} restart={restart} />
      )}
      {currentPage === 'settings' && (
        <SettingsPage
          solution={remainingSolution}
          updateSolution={updateSolution}
          restart={restart}
          onNavigate={onNavigate}
        />
      )}
      {currentPage === 'about' && (
        <AboutPage
          onClose={() => {
            onNavigate('settings')
          }}
        />
      )}
      {didWin &&
        currentPage === 'home' && (
          <Overlay>
            <p>YOU WON</p>
            <Button onMouseDown={restart}>Play again?</Button>
          </Overlay>
        )}

      {didLoose &&
        currentPage === 'home' && (
          <Overlay>
            <p>YOU LOST</p>
            <Button onMouseDown={restart}>Play again?</Button>
          </Overlay>
        )}
    </div>
  </div>
)

export default App
