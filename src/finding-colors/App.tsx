import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import BackgroundImage from "src/shared/components/BackgroundImage";
import Grid from "src/shared/components/Grid";
import Overlay from "src/shared/components/Overlay";
import Button from "src/shared/components/Button";
import { sample } from "src/shared/utils/general";
import "./App.css";
import dog from "./charles-deluvio-628935-unsplash.jpg";

// credits image: Photo by Charles Deluvio 🇵🇭🇨🇦 on Unsplash

interface Props extends RouteComponentProps {}

interface State {
  currentAnswer?: string;
  answers: Answer[];
  question: string;
  didWin: boolean;
}

interface Answer {
  name: string;
  colorCode: string;
}

const possibleAnswers = [
  { name: "blue", colorCode: "#124bf8" },
  { name: "orange", colorCode: "#ef7d00" },
  { name: "green", colorCode: "#75b843" },
  { name: "red", colorCode: "#d01534" },
  { name: "white", colorCode: "#ffffff" },
  { name: "yellow", colorCode: "#ffd332" },
  { name: "black", colorCode: "#00141a" },
  { name: "purple", colorCode: "#9b128f" }
];

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const puzzle = this.generatePuzzle();
    this.state = {
      ...puzzle,
      didWin: false
    };
  }

  public generatePuzzle = () => {
    const answers = new Array(25).fill(null).map(a => sample(possibleAnswers));
    const question = sample(answers).name;
    return { answers, question };
  };

  public render() {
    return (
      <BackgroundImage imageSrc={dog}>
        <div className="app">
          <h1 className="question" data-testid="question">
            {this.state.question.toUpperCase()}
          </h1>
          {this.renderAnswers(this.state.answers)}
        </div>
        {this.state.didWin && (
          <Overlay>
            <p data-testid="youwon">YOU WON</p>
            <Button onMouseDown={this.resetGame}>Play again?</Button>
          </Overlay>
        )}
      </BackgroundImage>
    );
  }

  public renderAnswers(answers: Answer[]) {
    const { currentAnswer, question } = this.state;
    return (
      <Grid>
        {answers.map((answer, index) => (
          <Grid.Item
            key={index}
            onMouseDown={() => this.handlePress(answer)}
            onTouchStart={() => this.handlePress(answer)}
            slideouttop={
              currentAnswer === question && currentAnswer !== answer.name
            }
            style={{ backgroundColor: answer.colorCode }}
            data-testid={`button-${answer.name}`}
          />
        ))}
      </Grid>
    );
  }

  public handlePress = (item: Answer) => {
    const currentAnswer = item.name;
    const { question } = this.state;
    this.setState({ currentAnswer });
    if (currentAnswer === question) {
      setTimeout(() => this.setState({ didWin: true }), 1000);
    }
  };

  public resetGame = () => {
    const puzzle = this.generatePuzzle();
    this.setState({ ...puzzle, currentAnswer: undefined, didWin: false });
  };
}

export default App;
