import { initialize } from "minimal-analytics";
import preventDoubleTapZoom from "prevent-double-tap-zoom";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import App from "./AppContainer";
import { audioMiddleware } from "./redux/audio-middleware";
import { IGameState } from "./types";
import reducers from "./redux/reducers";
import "./index.css";
import register from "./registerServiceWorker";
import { BugsnagErrorBoundary } from "./utils/bugsnag";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore<IGameState, any, any, any>(
  reducers,
  composeEnhancers(applyMiddleware(audioMiddleware))
);

ReactDOM.render(
  <BugsnagErrorBoundary>
    <Provider store={store}>
      <App />
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
