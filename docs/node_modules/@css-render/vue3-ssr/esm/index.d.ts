import { App } from 'vue';
interface CssrSsrContext {
    styles: string[];
    ids: Set<string>;
}
declare function ssrAdapter(id: string, style: string): void;
export declare function useSsrAdapter(): {
    adapter: typeof ssrAdapter;
    context: CssrSsrContext;
} | undefined;
interface SsrHandle {
    collect: () => string;
}
export declare function setup(app: App): SsrHandle;
export {};
