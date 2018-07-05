import HomeIcon from '@material-ui/icons/Home'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import festen from 'assets/festen.jpg'
import Game from 'components/Game/'
import BackgroundImage from 'components/UI/BackgroundImage'
import BottomBar from 'components/UI/BottomBar'
import Button from 'components/UI/Button'
import Overlay from 'components/UI/Overlay'
import AboutPage from 'pages/About'
import NewGamePage from 'pages/NewGame'
import SettingsPage from 'pages/Settings'
import * as React from 'react'
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
  <BackgroundImage imageSrc={festen}>
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
  </BackgroundImage>
)

export default App
