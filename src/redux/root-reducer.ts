import game from "./reducers";
import { combineReducers } from "redux";
import navigation from "./navigation-reducer";

const rootReducer = combineReducers({
  game,
  navigation
});

export default rootReducer;
