import * as React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Overlay from "../../components/Overlay";

const MIN_NAME_LENGTH = 4;
const MAX_NAME_LENGTH = 9;
interface ISettingsProps {
  className?: string;
  solution: string;
  updateSolution: (solution: string) => void;
  onNavigate: (screen: string) => void;
  restart: () => void;
}

interface ISettingsState {
  value: string;
}

class Settings extends React.Component<ISettingsProps, ISettingsState> {
  constructor(props: any) {
    super(props);
    this.state = { value: props.solution };
  }

  public render() {
    const { solution, updateSolution, restart, onNavigate } = this.props;
    const { value } = this.state;

    return (
      <Overlay>
        <p>Finding...</p>
        <Input
          type="text"
          valid={this.isValid(value)}
          name="solution"
          maxLength={9}
          value={value}
          placeholder={solution}
          onChange={(e) => {
            const newValue = e.currentTarget.value.toUpperCase();
            this.setState({ value: newValue });

            if (this.isValid(newValue)) {
              updateSolution(newValue);
            }
          }}
        />
        <Button
          disabled={!this.isValid(value)}
          onClick={() => {
            restart();
            onNavigate("home");
          }}
        >
          Save
        </Button>
      </Overlay>
    );
  }

  private isValid(value: string) {
    return value.length >= MIN_NAME_LENGTH && value.length <= MAX_NAME_LENGTH;
  }
}

export default Settings;
