import * as React from "react";
import Button from "../../components/Button";
import Overlay from "../../components/Overlay";

interface Props {
  onNavigate: (screen: string) => void;
  restart: () => void;
}

const NewGamePage = ({ onNavigate, restart }: Props) => {
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
        isSecondary
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
