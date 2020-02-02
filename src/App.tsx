import { faCog, faInfoCircle, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch
} from "react-redux";
import Grid from "./components/Grid";
import AboutPage from "./pages/About";
import NewGamePage from "./pages/NewGame";
import SettingsPage from "./pages/Settings";
import BackgroundImage from "./components/BackgroundImage";
import BottomBar from "./components/BottomBar";
import Button from "./components/Button";
import Overlay from "./components/Overlay";
import { IGridItem, StatusEnum } from "./types";
import { AppState } from "./redux/reducers";
import { AppDispatch } from "./";
import { filterPossibleSolutions } from "model/puzzle";
import {
  youWon,
  addCorrect,
  addAlmost,
  addWrong,
  updateSolution,
  restart
} from "redux/actions";
import "./App.css";

export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;

const festenUrl =
  "https://res.cloudinary.com/vnglst/image/upload/f_auto/v1537882150/festen.jpg";

export default function App() {
  const [page, setPage] = useState("home");
  const dispatch: AppDispatch = useDispatch();
  const grid = useSelector(state => state.grid);
  const remaining = useSelector(state => state.remaining);
  const solution = useSelector(state => state.solution);
  const solutions = useSelector(state => state.solutions);
  const didWin = useSelector(state => state.remaining.length === 0);

  function handleClick(answer: IGridItem) {
    if (answer.status === StatusEnum.Correct) return;

    const possibleSolutions = filterPossibleSolutions(solutions, answer);

    if (possibleSolutions.length > 0) {
      dispatch(addCorrect(answer));
      if (remaining.length <= 1) dispatch(youWon());
      return;
    }

    const almostCorrect = solutions.find(solution => {
      return solution.find(
        s => s.column === answer.column && s.row === answer.row
      );
    });

    if (almostCorrect) {
      dispatch(addAlmost(answer));
      return;
    }

    dispatch(addWrong(answer));
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
            restart={() => dispatch(restart())}
          />
        )}
        {page === "settings" && (
          <SettingsPage
            solution={solution}
            updateSolution={newSolution =>
              dispatch(updateSolution(newSolution))
            }
            restart={() => dispatch(restart())}
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
                dispatch(restart());
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
