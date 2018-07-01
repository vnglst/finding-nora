import Button from 'components/UI/Button'
import Overlay from 'components/UI/Overlay'
import * as React from 'react'

interface INewGameProps {
  onNavigate: (screen: string) => void
  restart: () => void
}

const NewGamePage = ({ onNavigate, restart }: INewGameProps) => {
  return (
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
  )
}

export default NewGamePage
