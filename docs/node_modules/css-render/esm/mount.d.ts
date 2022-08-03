import { CNode, CssRenderInstance, CRenderProps, MountId, SsrAdapter } from './types';
export declare function unmount(intance: CssRenderInstance, node: CNode, id: MountId): void;
declare function mount(instance: CssRenderInstance, node: CNode, id: MountId, props: CRenderProps, head: boolean, silent: boolean, force: boolean, anchorMetaName: string | undefined, ssrAdapter: SsrAdapter): void;
declare function mount(instance: CssRenderInstance, node: CNode, id: MountId, props: CRenderProps, head: boolean, silent: boolean, force: boolean, anchorMetaName: string | undefined, ssrAdapter?: undefined): HTMLStyleElement;
declare function mount(instance: CssRenderInstance, node: CNode, id: MountId, props: CRenderProps, head: boolean, silent: boolean, force: boolean, anchorMetaName: string | undefined, ssrAdapter?: SsrAdapter): HTMLStyleElement | void;
export { mount };
