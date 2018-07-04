import { isCorrectAnswer, isCorrectLetter } from 'model/game-model'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as actions from 'redux/game-actions'
import { GridType, IGridItem, IStoreState, StatusEnum } from 'types'
import Game from './Game'

const getAnswerStatus = ({ answer, solution, grid }: IAddAnswer) => {
  const isCorrect = isCorrectAnswer({ answer, solution, grid })
  if (isCorrect) {
    return StatusEnum.Correct
  }

  if (!isCorrect && isCorrectLetter({ answer, grid, solution })) {
    return StatusEnum.AlmostCorrect
  }

  return StatusEnum.Wrong
}

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
    const status = getAnswerStatus({ answer, solution, grid })
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
