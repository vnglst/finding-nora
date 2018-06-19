// tslint:disable:no-console
import { connect, Dispatch } from 'react-redux'
import * as actions from '../../redux/game'
import { IStoreState } from '../../types'
import Game from './Game'

export function mapStateToProps({ game }: IStoreState) {
  return {
    game,
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.GameAction>) {
  return {
    addAnswer: ({ answer, solution, grid }: actions.IAddAnswer) =>
      dispatch(actions.addAnswer({ answer, solution, grid })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game)
