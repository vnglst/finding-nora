import * as React from "react";
import Button from "../components/Button";
import Overlay from "../components/Overlay";

interface Props {
  setPage: (screen: string) => void;
  restart: () => void;
}

export default function NewGamePage({ setPage, restart }: Props) {
  return (
    <Overlay>
      <Button
        onMouseDown={() => {
          restart();
          setPage("home");
        }}
        testId="new-game-restart"
      >
        New game
      </Button>
      <Button
        isSecondary
        onMouseDown={() => {
          setPage("home");
        }}
        testId="new-game-resume"
      >
        Resume game
      </Button>
    </Overlay>
  );
}
