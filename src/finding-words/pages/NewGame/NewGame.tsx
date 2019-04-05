import * as React from "react";
import Button from "src/shared/components/Button";
import Overlay from "src/shared/components/Overlay";

interface INewGameProps {
  onNavigate: (screen: string) => void;
  restart: () => void;
}

const NewGamePage = ({ onNavigate, restart }: INewGameProps) => {
  return (
    <Overlay>
      <Button
        onMouseDown={() => {
          restart();
          onNavigate("home");
        }}
      >
        New game
      </Button>
      <Button
        onMouseDown={() => {
          onNavigate("home");
        }}
      >
        Resume game
      </Button>
    </Overlay>
  );
};

export default NewGamePage;
