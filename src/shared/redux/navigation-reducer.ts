import { INavigationState } from "src/finding-words/types";
import { SET_ACTIVE_PAGE } from "./constants";
import { NavigationActionType } from "./navigation-actions";

const initialNavigationState: INavigationState = {
  currentPage: "home"
};

export default function navigation(
  state = initialNavigationState,
  action: NavigationActionType
): INavigationState {
  switch (action.type) {
    case SET_ACTIVE_PAGE:
      return { ...state, currentPage: action.page };
    default:
      return state;
  }
}
