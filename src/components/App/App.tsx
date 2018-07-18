import { faCog, faInfoCircle, faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  solution: string[]
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
  solution,
  remainingSolution,
}: IAppProps) => (
  <BackgroundImage imageSrc={festen}>
    <div className="app">
      <p>{remainingSolution}</p>
      <Game />
      <BottomBar value={currentPage} onChange={onNavigate}>
        <BottomBar.Item
          aria-label="New game"
          value="new-game"
          icon={<FontAwesomeIcon icon={faRedo} />}
        />
        <BottomBar.Item
          aria-label="Settings"
          value="settings"
          icon={<FontAwesomeIcon icon={faCog} />}
        />
        <BottomBar.Item
          aria-label="About this app"
          value="about"
          icon={<FontAwesomeIcon icon={faInfoCircle} />}
        />
      </BottomBar>
      {currentPage === 'new-game' && (
        <NewGamePage onNavigate={onNavigate} restart={restart} />
      )}
      {currentPage === 'settings' && (
        <SettingsPage
          solution={solution}
          updateSolution={updateSolution}
          restart={restart}
          onNavigate={onNavigate}
        />
      )}
      {currentPage === 'about' && (
        <AboutPage
          onClose={() => {
            onNavigate('home')
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
