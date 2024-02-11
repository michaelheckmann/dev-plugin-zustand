import { StoreApi, UseBoundStore } from "zustand";
type Store = UseBoundStore<StoreApi<unknown>>;
type UseZustandDevTools = {
    name: string;
    store: Store;
} | {
    name: string;
    store: Store;
}[];
export declare function useZustandDevTools(args: UseZustandDevTools): void;
export {};
//# sourceMappingURL=useZustandDevTools.d.ts.map