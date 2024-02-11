import { useDevToolsPluginClient, type EventSubscription } from "expo/devtools";
import { useCallback, useEffect, useState } from "react";

import { Method, MethodAck } from "../../method";
import { useShowErrorToast } from "./useErrorToast";

const methodAck: Record<Method, MethodAck> = {
  getAll: "ack:getAll",
  set: "ack:set",
  remove: "ack:remove",
};

export function usePluginStore(onError: (error: unknown) => void) {
  const showToast = useShowErrorToast();
  const client = useDevToolsPluginClient("zustand-dev-tools");

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    interval = setInterval(() => {
      if (client?.isConnected()) {
        if (interval != null) {
          clearInterval(interval);
          interval = null;
        }
        setConnected(true);
      }
    }, 1000);
    return () => {
      if (interval != null) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, [client]);

  const [entries, setEntries] = useState<{ name: string; state: object }[]>([]);

  const update = useCallback(async () => {
    if (!client?.isConnected()) {
      showToast("Not connected to host");
      return;
    }
    try {
      return client?.sendMessage("getAll", {});
    } catch (e) {
      onError(e);
    }
  }, [client, showToast, onError]);

  const set = useCallback(
    async (key: string, value: object) => {
      if (!client?.isConnected()) {
        showToast("Not connected to host");
        return;
      }
      try {
        return client.sendMessage("set", {
          key,
          value,
        });
      } catch (e) {
        onError(e);
      }
    },
    [client, showToast, onError]
  );

  useEffect(() => {
    if (!client?.isConnected()) {
      return;
    }

    const subscriptions: EventSubscription[] = [];

    try {
      subscriptions.push(
        client.addMessageListener(
          methodAck.getAll,
          ({ result }: { result: { name: string; state: object }[] }) => {
            setEntries(result);
          }
        )
      );
    } catch (e) {
      onError(e);
    }

    try {
      subscriptions.push(
        client.addMessageListener(methodAck.set, () => {
          update();
        })
      );
    } catch (e) {
      onError(e);
    }

    subscriptions.push(
      client.addMessageListener("error", ({ error }: { error: unknown }) => {
        onError(error);
      })
    );

    return () => {
      for (const subscription of subscriptions) {
        try {
          subscription?.remove();
        } catch (e) {
          onError(e);
        }
      }
    };
  }, [client, onError, showToast, update]);

  return {
    entries,
    update,
    set,
    ready: connected,
  };
}
