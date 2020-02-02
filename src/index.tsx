import { initialize } from "minimal-analytics";
import preventDoubleTapZoom from "prevent-double-tap-zoom";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import App from "./App";
import { middleware } from "./redux/middleware";
import { reducers } from "./redux/reducers";
import register from "./registerServiceWorker";
import { BugsnagErrorBoundary } from "./utils/bugsnag";
import "./index.css";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(middleware))
);

export type AppDispatch = typeof store.dispatch;

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
