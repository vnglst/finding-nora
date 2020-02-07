import * as React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Overlay from "../components/Overlay";

const MIN_NAME_LENGTH = 4;
const MAX_NAME_LENGTH = 9;
interface Props {
  className?: string;
  solution: string;
  addSolution: (solution: string) => void;
  onNavigate: (screen: string) => void;
  restart: () => void;
}

function isValid(value: string) {
  return value.length >= MIN_NAME_LENGTH && value.length <= MAX_NAME_LENGTH;
}

export default function Settings({
  solution,
  addSolution,
  restart,
  onNavigate
}: Props) {
  const [value, setValue] = React.useState(solution);

  return (
    <Overlay>
      <p>Finding...</p>
      <Input
        type="text"
        valid={isValid(value)}
        name="solution"
        maxLength={9}
        value={value}
        placeholder={solution}
        onChange={e => {
          const newValue = e.currentTarget.value.toUpperCase();
          setValue(newValue);
          if (isValid(newValue)) {
            // only update solution in redux state if valid
            addSolution(newValue);
          }
        }}
      />
      <Button
        disabled={!isValid(value)}
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
