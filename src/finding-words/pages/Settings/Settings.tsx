import * as React from "react";
import Button from "shared/components/Button";
import Input from "shared/components/Input";
import Overlay from "shared/components/Overlay";

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 9;

interface ISettingsProps {
  className?: string;
  solution: string[];
  updateSolution: (solution: string[]) => void;
  onNavigate: (screen: string) => void;
  restart: () => void;
}

interface ISettingsState {
  value: string;
}

class Settings extends React.Component<ISettingsProps, ISettingsState> {
  constructor(props: any) {
    super(props);
    this.state = { value: props.solution.join("") };
  }

  public render() {
    const { solution, updateSolution, restart, onNavigate } = this.props;
    const { value } = this.state;
    const valid =
      value.length > MIN_NAME_LENGTH && value.length <= MAX_NAME_LENGTH;

    return (
      <Overlay>
        <p>Finding...</p>
        <Input
          type="text"
          valid={valid}
          name="solution"
          maxLength={9}
          value={value}
          placeholder={solution.join("")}
          onChange={e => {
            this.setState({ value: e.currentTarget.value.toUpperCase() });
          }}
          onBlur={e => {
            const newSolution = e.target.value.split("");
            if (valid) {
              updateSolution(newSolution);
            }
          }}
        />
        <Button
          disabled={!valid}
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
}

export default Settings;
