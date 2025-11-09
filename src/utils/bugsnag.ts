import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import React from "react";

Bugsnag.start({
  apiKey: "eb9c66e47f7f95c5801a21ffe1308619",
  plugins: [new BugsnagPluginReact()]
});

export const bugsnagClient = Bugsnag;
export const BugsnagErrorBoundary = Bugsnag.getPlugin("react")!.createErrorBoundary(React);

export function reportError(error: Error) {
  return Bugsnag.notify(error);
}
