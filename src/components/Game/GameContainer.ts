import { isCorrectAnswer, isCorrectLetter } from 'model/game-model'
import { connect, Dispatch } from 'react-redux'
import * as actions from 'redux/game-actions'
import { GridType, IGridItem, IStoreState, StatusEnum } from 'types'
import Game from './Game'

const mapStateToProps = ({ game }: IStoreState) => {
  return {
    game,
  }
}

interface IAddAnswer {
  answer: IGridItem
  grid: GridType
  solution: string[]
}

const mapDispatchToProps = (dispatch: Dispatch<actions.GameActionType>) => {
  const addAnswer = ({ answer, solution, grid }: IAddAnswer) => {
    const isCorrect = isCorrectAnswer({ answer, solution, grid })
    let status = isCorrect ? StatusEnum.Correct : StatusEnum.Wrong
    if (!isCorrect && isCorrectLetter({ answer, grid, solution })) {
      status = StatusEnum.AlmostCorrect
    }
    const answerWithStatus = {
      ...answer,
      status,
    }
    dispatch(actions.addAnswer(answerWithStatus))
  }

  return {
    addAnswer,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game)
