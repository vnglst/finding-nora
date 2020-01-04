import { faCog, faInfoCircle, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import Game from "./components/Game/";
import AboutPage from "./pages/About";
import NewGamePage from "./pages/NewGame";
import SettingsPage from "./pages/Settings";

import BackgroundImage from "./components/BackgroundImage";
import BottomBar from "./components/BottomBar";
import Button from "./components/Button";
import Overlay from "./components/Overlay";
import "./App.css";

const festenUrl =
  "https://res.cloudinary.com/vnglst/image/upload/f_auto/v1537882150/festen.jpg";

interface IAppProps {
  currentPage: string;
  didWin: boolean;
  didLoose: boolean;
  remainingSolution: string[];
  solution: string[];
  updateSolution: (solution: string[]) => void;
  onNavigate: (screen: string) => void;
  restart: () => void;
}

const App = ({
  didWin,
  didLoose,
  currentPage,
  updateSolution,
  onNavigate,
  restart,
  solution,
  remainingSolution
}: IAppProps) => (
  <BackgroundImage imageSrc={festenUrl}>
    <div className="app">
      <h1>{remainingSolution}</h1>
      <Game />
      <BottomBar value={currentPage} onChange={onNavigate}>
        <BottomBar.Item
          aria-label="New game"
          value="new-game"
          icon={<FontAwesomeIcon icon={faRedo} />}
        />
        <BottomBar.Item
          aria-label="Settings"
          value="settings"
          icon={<FontAwesomeIcon icon={faCog} />}
        />
        <BottomBar.Item
          aria-label="About this app"
          value="about"
          icon={<FontAwesomeIcon icon={faInfoCircle} />}
        />
      </BottomBar>
      {currentPage === "new-game" && (
        <NewGamePage onNavigate={onNavigate} restart={restart} />
      )}
      {currentPage === "settings" && (
        <SettingsPage
          solution={solution}
          updateSolution={updateSolution}
          restart={restart}
          onNavigate={onNavigate}
        />
      )}
      {currentPage === "about" && (
        <AboutPage
          onClose={() => {
            onNavigate("home");
          }}
        />
      )}
      {didWin && currentPage === "home" && (
        <Overlay>
          <p>YOU WON</p>
          <Button onMouseDown={restart}>Play again?</Button>
        </Overlay>
      )}

      {didLoose && currentPage === "home" && (
        <Overlay>
          <p>YOU LOST</p>
          <Button onMouseDown={restart}>Play again?</Button>
        </Overlay>
      )}
    </div>
  </BackgroundImage>
);

export default App;
