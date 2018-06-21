import * as React from 'react'
import Button from '../UI/Button'
import Overlay from '../UI/Overlay'

export interface ISettingsProps {
  className?: string
  solution: string[]
  updateSolution: (solution: string[]) => void
  onNavigate: (screen: string) => void
  restart: () => void
}

class Settings extends React.Component<ISettingsProps, object> {
  public render() {
    const { solution, updateSolution, restart, onNavigate } = this.props
    return (
      <Overlay>
        <p>Your name</p>
        <input
          type="text"
          name="solution"
          placeholder={solution.join('')}
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
    )
  }
}

export default Settings
