import * as React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Overlay from "../components/Overlay";

const MIN_NAME_LENGTH = 4;
const MAX_NAME_LENGTH = 9;
interface Props {
  className?: string;
  addSolution: (solution: string) => void;
  setPage: (screen: string) => void;
  restart: () => void;
  reset: () => void;
}

function isValid(value: string) {
  return value.length >= MIN_NAME_LENGTH && value.length <= MAX_NAME_LENGTH;
}

export default function Settings({
  addSolution,
  restart,
  reset,
  setPage: onNavigate
}: Props) {
  const [value, setValue] = React.useState("NORA");

  return (
    <Overlay>
      <p>Finding...</p>
      <Input
        type="text"
        valid={isValid(value)}
        name="solution"
        maxLength={9}
        value={value}
        placeholder="NORA"
        onChange={e => {
          const newValue = e.currentTarget.value.toUpperCase();
          setValue(newValue);
        }}
      />
      <span>
        <Button
          disabled={!isValid(value)}
          onClick={() => {
            addSolution(value);
            restart();
            onNavigate("home");
          }}
          testId="settings-add"
        >
          Add
        </Button>
        <Button
          isSecondary
          onClick={() => {
            reset();
            onNavigate("home");
          }}
          testId="settings-reset"
        >
          Reset
        </Button>
      </span>
    </Overlay>
  );
}
