// tslint:disable:no-console
import { connect, Dispatch } from 'react-redux'
import * as actions from '../../redux/game-actions'
import { isCorrectAnswer } from '../../redux/game-model'
import { IStoreState } from '../../types'
import Game from './Game'

const mapStateToProps = ({ game }: IStoreState) => {
  return {
    game,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<actions.GameActionType>) => {
  const addAnswer = ({ answer, solution, grid }: actions.IAddAnswer) => {
    const isCorrect = isCorrectAnswer({ answer, solution, grid })
    const answerWithStatus = {
      ...answer,
      status: isCorrect ? 'correct' : 'incorrect',
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
