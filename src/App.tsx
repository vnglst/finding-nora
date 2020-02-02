import { faCog, faInfoCircle, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "./components/Grid";
import AboutPage from "./pages/About";
import NewGamePage from "./pages/NewGame";
import SettingsPage from "./pages/Settings";

import BackgroundImage from "./components/BackgroundImage";
import BottomBar from "./components/BottomBar";
import Button from "./components/Button";
import Overlay from "./components/Overlay";
import { IGridItem, StatusEnum } from "./types";
import { IGameState } from "./redux/reducers";

import "./App.css";
import { filterPossibleSolutions } from "model/puzzle";

const festenUrl =
  "https://res.cloudinary.com/vnglst/image/upload/f_auto/v1537882150/festen.jpg";

export default function App() {
  const [page, setPage] = useState("home");
  const dispatch = useDispatch();
  const grid = useSelector((state: IGameState) => state.grid);
  const remaining = useSelector((state: IGameState) => state.remaining);
  const solution = useSelector((state: IGameState) => state.solution);
  const solutions = useSelector((state: IGameState) => state.solutions);
  const didWin = useSelector(
    (state: IGameState) => state.remaining.length === 0
  );

  function handleClick(answer: IGridItem) {
    if (answer.status === StatusEnum.Correct) return;

    const possibleSolutions = filterPossibleSolutions(solutions, answer);

    if (possibleSolutions.length > 0) {
      dispatch({ type: "CORRECT_ANSWER", payload: answer });
      if (remaining.length <= 1) dispatch({ type: "YOU_WON" });
      return;
    }

    const almostCorrect = solutions.find((solution) => {
      return solution.find(
        (s) => s.column === answer.column && s.row === answer.row
      );
    });

    if (almostCorrect) {
      dispatch({ type: "ALMOST_CORRECT_ANSWER", payload: answer });
      return;
    }

    dispatch({ type: "WRONG_ANSWER", payload: answer });
  }

  return (
    <BackgroundImage imageSrc={festenUrl}>
      <div className="app">
        <h1>{remaining}</h1>
        <Grid>
          {grid.map((_, row) =>
            _.map((item, column) => (
              <Grid.Item
                key={`${row}-${column}`}
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
          <NewGamePage
            onNavigate={setPage}
            restart={() => dispatch({ type: "RESTART" })}
          />
        )}
        {page === "settings" && (
          <SettingsPage
            solution={solution}
            updateSolution={(newSolution) =>
              dispatch({ type: "UPDATE_SOLUTION", payload: newSolution })
            }
            restart={() => dispatch({ type: "RESTART" })}
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
            <Button
              onMouseDown={() => {
                dispatch({ type: "RESTART" });
              }}
            >
              Play again?
            </Button>
          </Overlay>
        )}
      </div>
    </BackgroundImage>
  );
}
