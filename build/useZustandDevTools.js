import { useDevToolsPluginClient } from "expo/devtools";
import { useEffect } from "react";
export function useZustandDevTools(args) {
    const stores = Array.isArray(args) ? args : [args];
    const client = useDevToolsPluginClient("zustand-dev-tools");
    useEffect(() => {
        const on = (event, listener) => client?.addMessageListener(event, async (params) => {
            try {
                const result = await listener(params);
                client?.sendMessage(`ack:${event}`, { result });
            }
            catch (error) {
                client?.sendMessage("error", { error });
            }
        });
        const subscriptions = [];
        subscriptions.push(on("getAll", () => {
            return stores.map(({ name, store }) => {
                const state = store.getState();
                return { name, state };
            });
        }));
        subscriptions.push(on("set", ({ store, key, value }) => {
            if (key !== undefined && value !== undefined && store !== undefined) {
                return stores.find((s) => s.name === store)?.store.setState(value);
            }
            else {
                throw new Error("Invalid parameters");
            }
        }));
        return () => {
            for (const subscription of subscriptions) {
                subscription?.remove();
            }
        };
    }, [client]);
}
//# sourceMappingURL=useZustandDevTools.js.map