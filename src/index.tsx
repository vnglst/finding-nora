import { Router } from "@reach/router";
import { initialize } from "minimal-analytics";
import preventDoubleTapZoom from "prevent-double-tap-zoom";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import FindingWords from "finding-words";
import { audioMiddleware } from "finding-words/redux/audio-middleware";
import { IStoreState } from "finding-words/types";
import rootReducer from "shared/redux/root-reducer";
import "./index.css";
import register from "./registerServiceWorker";
import { BugsnagErrorBoundary } from "./shared/utils/bugsnag";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore<IStoreState, any, any, any>(
  rootReducer,
  composeEnhancers(applyMiddleware(audioMiddleware))
);

ReactDOM.render(
  <BugsnagErrorBoundary>
    <Provider store={store}>
      <Router>
        <FindingWords path="/" default={true} />
      </Router>
    </Provider>
  </BugsnagErrorBoundary>,
  document.getElementById("root") as HTMLElement
);

preventDoubleTapZoom({ delay: 500 });
register();

function initializeAnalyticsOnProduction() {
  if (process.env.NODE_ENV === "production") {
    initialize(window, "UA-135954444-1", {
      anonymizeIp: true,
      colorDepth: true,
      characterSet: true,
      screenSize: true,
      language: true
    });
  }
}

initializeAnalyticsOnProduction();
