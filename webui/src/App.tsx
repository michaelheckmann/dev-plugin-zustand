import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { GluestackUIProvider } from "@gluestack-ui/themed";
import React from "react";
import { Main } from "./Main";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Main />
    </GluestackUIProvider>
  );
}
