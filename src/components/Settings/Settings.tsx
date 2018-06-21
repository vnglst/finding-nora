// tslint:disable:no-console
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

export interface ISettingsState {
  value: string
}

class Settings extends React.Component<ISettingsProps, ISettingsState> {
  constructor(props: any) {
    super(props)
    this.state = { value: '' }
  }

  public render() {
    const { solution, updateSolution, restart, onNavigate } = this.props
    const { value } = this.state
    return (
      <Overlay>
        <p>Your name</p>
        <input
          type="text"
          name="solution"
          maxLength={9}
          value={value}
          placeholder={solution.join('')}
          onChange={e => {
            this.setState({ value: e.target.value })
          }}
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
