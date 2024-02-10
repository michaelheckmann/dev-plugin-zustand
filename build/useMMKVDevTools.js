import { useDevToolsPluginClient } from 'expo/devtools';
import { useEffect } from 'react';
export function useMMKVDevTools() {
    const client = useDevToolsPluginClient('mmkv-expo-devtool');
    useEffect(() => {
        const subscriptions = [];
        subscriptions.push(client?.addMessageListener('ping', (data) => {
            alert(`Received ping from ${data.from}`);
        }));
        client?.sendMessage('ping', { from: 'app' });
        return () => {
            for (const subscription of subscriptions) {
                subscription?.remove();
            }
        };
    }, [client]);
}
//# sourceMappingURL=useMMKVDevTools.js.map