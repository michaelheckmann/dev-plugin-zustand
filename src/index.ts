export let useZustandDevTools: typeof import("./useZustandDevTools").useZustandDevTools;

// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== "production") {
  useZustandDevTools = require("./useZustandDevTools").useZustandDevTools;
} else {
  useZustandDevTools = () => {};
}
