import AboutIcon from '@material-ui/icons/Info'
import Button from 'components/UI/Button'
import Overlay from 'components/UI/Overlay'
import * as React from 'react'

interface ISettingsProps {
  className?: string
  solution: string[]
  updateSolution: (solution: string[]) => void
  onNavigate: (screen: string) => void
  restart: () => void
}

interface ISettingsState {
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
        <p>Finding...</p>
        <input
          type="text"
          name="solution"
          maxLength={9}
          value={value}
          placeholder={solution.join('')}
          onChange={e => {
            this.setState({ value: e.target.value.toUpperCase() })
          }}
          onBlur={e => {
            const newSolution = e.target.value.split('')
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
        <button className="button-icon" onClick={() => onNavigate('about')}>
          <AboutIcon className="about-icon" />
        </button>
      </Overlay>
    )
  }
}

export default Settings
