export declare type ItemData = Record<string, any>;
export interface VScrollToOptions extends ScrollToOptions {
    index?: number;
    key?: number | string;
    position?: 'top' | 'bottom';
    debounce?: boolean;
}
