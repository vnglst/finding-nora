import { faCog, faInfoCircle, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import Grid from "./components/Grid";
import AboutPage from "./pages/About";
import NewGamePage from "./pages/NewGame";
import SettingsPage from "./pages/Settings";

import BackgroundImage from "./components/BackgroundImage";
import BottomBar from "./components/BottomBar";
import Button from "./components/Button";
import Overlay from "./components/Overlay";
import "./App.css";
import { GridType, IGameState, IGridItem, StatusEnum } from "./types";

const festenUrl =
  "https://res.cloudinary.com/vnglst/image/upload/f_auto/v1537882150/festen.jpg";

interface IAddAnswer {
  answer: IGridItem;
  solution: string[];
  grid: GridType;
}
interface IAppProps {
  didWin: boolean;
  didLoose: boolean;
  remainingSolution: string[];
  solution: string[];
  updateSolution: (solution: string[]) => void;
  restart: () => void;
  game: IGameState;
  addAnswer: ({ answer, solution, grid }: IAddAnswer) => void;
}

export default function App({
  didWin,
  didLoose,
  updateSolution,
  restart,
  solution,
  remainingSolution,
  game,
  addAnswer
}: IAppProps) {
  const [page, setPage] = React.useState("home");

  const handleClick = (item: IGridItem) => {
    if (
      item.status === StatusEnum.Correct ||
      item.status === StatusEnum.Wrong
    ) {
      return; // already answered
    }
    addAnswer({ answer: item, solution: game.solution, grid: game.grid });
  };

  return (
    <BackgroundImage imageSrc={festenUrl}>
      <div className="app">
        <h1>{remainingSolution}</h1>
        <Grid>
          {game.grid.map((row, rowIndex) =>
            row.map((item, columnIndex) => (
              <Grid.Item
                key={`${rowIndex}-${columnIndex}`}
                onClick={() => handleClick(item)}
                falldown={item.status === StatusEnum.Wrong}
                red={item.status === StatusEnum.Wrong}
                green={item.status === StatusEnum.Correct}
                orange={item.status === StatusEnum.AlmostCorrect}
              >
                {item.letter}
              </Grid.Item>
            ))
          )}
        </Grid>
        <BottomBar value={page} onChange={setPage}>
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
        {page === "new-game" && (
          <NewGamePage onNavigate={setPage} restart={restart} />
        )}
        {page === "settings" && (
          <SettingsPage
            solution={solution}
            updateSolution={updateSolution}
            restart={restart}
            onNavigate={setPage}
          />
        )}
        {page === "about" && (
          <AboutPage
            onClose={() => {
              setPage("home");
            }}
          />
        )}
        {didWin && page === "home" && (
          <Overlay>
            <p>YOU WON</p>
            <Button onMouseDown={restart}>Play again?</Button>
          </Overlay>
        )}

        {didLoose && page === "home" && (
          <Overlay>
            <p>YOU LOST</p>
            <Button onMouseDown={restart}>Play again?</Button>
          </Overlay>
        )}
      </div>
    </BackgroundImage>
  );
}
