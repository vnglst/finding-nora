import { isCorrectAnswer, isCorrectLetter } from 'finding-words/model/puzzle-utils'
import * as actions from 'finding-words/redux/game-actions'
import { GridType, IGridItem, IStoreState, StatusEnum } from 'finding-words/types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
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
    game
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
      status
    }
    dispatch(actions.addAnswer(answerWithStatus))
  }

  return {
    addAnswer
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
