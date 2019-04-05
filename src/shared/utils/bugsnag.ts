import bugsnag from "@bugsnag/js";
import bugsnagReact from "@bugsnag/plugin-react";
import * as React from "react";

export const bugsnagClient = bugsnag("eb9c66e47f7f95c5801a21ffe1308619");
bugsnagClient.use(bugsnagReact, React);
export const BugsnagErrorBoundary = bugsnagClient.getPlugin("react");
