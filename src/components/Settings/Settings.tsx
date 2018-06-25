import AboutIcon from '@material-ui/icons/Info'
import * as React from 'react'
import Button from '../UI/Button'
import Overlay from '../UI/Overlay'
import AboutPage from './AboutPage'

interface ISettingsProps {
  className?: string
  solution: string[]
  updateSolution: (solution: string[]) => void
  onNavigate: (screen: string) => void
  restart: () => void
}

interface ISettingsState {
  value: string
  aboutPageVisible: boolean
}

class Settings extends React.Component<ISettingsProps, ISettingsState> {
  constructor(props: any) {
    super(props)
    this.state = { value: '', aboutPageVisible: false }
  }

  public render() {
    const { solution, updateSolution, restart, onNavigate } = this.props
    const { value } = this.state

    if (this.state.aboutPageVisible) {
      return (
        <AboutPage
          onClosePage={() => this.setState({ aboutPageVisible: false })}
        />
      )
    }

    return (
      <Overlay>
        <p>Finding...</p>
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
        <button
          className="button-icon"
          onClick={() => this.setState({ aboutPageVisible: true })}
        >
          <AboutIcon className="about-icon" />
        </button>
      </Overlay>
    )
  }
}

export default Settings
