import AboutIcon from '@material-ui/icons/Info'
import Button from 'components/UI/Button'
import Input from 'components/UI/Input'
import Overlay from 'components/UI/Overlay'
import * as React from 'react'

const MIN_NAME_LENGTH = 3
const MAX_NAME_LENGTH = 9

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
    this.state = { value: props.solution.join('') }
  }

  public render() {
    const { solution, updateSolution, restart, onNavigate } = this.props
    const { value } = this.state
    const valid =
      value.length > MIN_NAME_LENGTH && value.length <= MAX_NAME_LENGTH

    return (
      <Overlay>
        <p>Finding...</p>
        <Input
          type="text"
          valid={valid}
          name="solution"
          maxLength={9}
          value={value}
          placeholder={solution.join('')}
          onChange={e => {
            this.setState({ value: e.currentTarget.value.toUpperCase() })
          }}
          onBlur={e => {
            const newSolution = e.target.value.split('')
            if (valid) {
              updateSolution(newSolution)
            }
          }}
        />
        <Button
          disabled={!valid}
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
