import { initialize } from "minimal-analytics";
import preventDoubleTapZoom from "prevent-double-tap-zoom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import App from "./App";
import { audioMiddleware } from "./redux/middleware-audio";
import { storageMiddleware, loadState } from "./redux/middleware-storage";
import { reducers } from "./redux/reducers";
import { registerSW } from 'virtual:pwa-register'
import "./index.css";

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  loadState(),
  composeEnhancers(applyMiddleware(audioMiddleware, storageMiddleware))
);

export type AppDispatch = typeof store.dispatch;

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

preventDoubleTapZoom({ delay: 500 });

// Register PWA service worker
registerSW({ immediate: true });

function initializeAnalyticsOnProduction() {
  if (import.meta.env.MODE === "production") {
    initialize(window, "UA-135954444-1", {
      serviceUrls: [
        "https://analytics.koenvangilst.nl/track",
        "https://www.google-analytics.com/collect"
      ],
      anonymizeIp: true,
      colorDepth: true,
      characterSet: true,
      screenSize: true,
      language: true
    });
  }
}

initializeAnalyticsOnProduction();
