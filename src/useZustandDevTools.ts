import { useDevToolsPluginClient, type EventSubscription } from "expo/devtools";
import { useEffect } from "react";
import { StoreApi, UseBoundStore } from "zustand";

import { Method } from "../method";

type Store = UseBoundStore<StoreApi<unknown>>;

type UseZustandDevTools =
  | {
      name: string;
      store: Store;
    }
  | {
      name: string;
      store: Store;
    }[];

export function useZustandDevTools(args: UseZustandDevTools) {
  const stores = Array.isArray(args) ? args : [args];

  const client = useDevToolsPluginClient("zustand-dev-tools");

  useEffect(() => {
    const on = (
      event: Method,
      listener: (params: {
        store?: string;
        key?: string;
        value?: object;
      }) => any
    ) =>
      client?.addMessageListener(
        event,
        async (params: { store?: string; key?: string; value?: object }) => {
          try {
            const result = await listener(params);
            client?.sendMessage(`ack:${event}`, { result });
          } catch (error) {
            client?.sendMessage("error", { error });
          }
        }
      );

    const subscriptions: EventSubscription[] = [];

    subscriptions.push(
      on("getAll", () => {
        return stores.map(({ name, store }) => {
          const state = store.getState();
          return { name, state };
        });
      })
    );

    subscriptions.push(
      on("set", ({ store, key, value }) => {
        if (key !== undefined && value !== undefined && store !== undefined) {
          return stores.find((s) => s.name === store)?.store.setState(value);
        } else {
          throw new Error("Invalid parameters");
        }
      })
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);
}
