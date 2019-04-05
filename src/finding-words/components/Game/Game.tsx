import * as React from "react";
import {
  GridType,
  IGameState,
  IGridItem,
  StatusEnum
} from "src/finding-words/types";

import Grid from "src/shared/components/Grid";

interface IAddAnswer {
  answer: IGridItem;
  solution: string[];
  grid: GridType;
}

interface IGameProps {
  game: IGameState;
  addAnswer: ({ answer, solution, grid }: IAddAnswer) => void;
}

const Game = ({ game, addAnswer }: IGameProps) => {
  const handlePress = (item: IGridItem) => {
    if (
      item.status === StatusEnum.Correct ||
      item.status === StatusEnum.Wrong
    ) {
      return; // already answered
    }
    addAnswer({ answer: item, solution: game.solution, grid: game.grid });
  };

  const { grid } = game;
  return (
    <Grid>
      {grid.map((row, rowIndex) =>
        row.map((item, columnIndex) => (
          <Grid.Item
            key={`${rowIndex}-${columnIndex}`}
            onMouseDown={() => handlePress(item)}
            onTouchStart={() => handlePress(item)}
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
  );
};

export default Game;
