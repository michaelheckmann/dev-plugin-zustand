# Expo Dev Plugin for Zustand

This is an [Expo Dev Tool Plugin](https://docs.expo.dev/debugging/devtools-plugins/) for inspecting and modifying (to be implemented) Zustand stores in your Expo app. It was created via the [create-dev-plugin](https://docs.expo.dev/debugging/create-devtools-plugins/) starter.

## Installation

```sh
npm install dev-plugin-zustand
```

## Usage

```tsx
import { useZustandDevTools } from "dev-plugin-zustand";
import { useStore1 } from "./store1";

export default function App() {
  useZustandDevTools([
    {
      name: "store1",
      store: useStore1,
    },
  ]);

  return (
    <View style={styles.container}>
      <Button
        title="Ping"
        onPress={() => {
          sendPing();
        }}
      />
    </View>
  );
}
```
