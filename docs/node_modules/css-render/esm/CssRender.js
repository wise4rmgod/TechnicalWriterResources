import { c } from './c';
import { queryElement } from './utils';
export function CssRender(config = {}) {
    let styleSheet = null;
    const cssr = {
        c: ((...args) => c(cssr, ...args)),
        use: (plugin, ...args) => plugin.install(cssr, ...args),
        find: queryElement,
        context: {},
        config,
        get __styleSheet() {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (!styleSheet) {
                const style = document.createElement('style');
                document.head.appendChild(style);
                styleSheet = document.styleSheets[document.styleSheets.length - 1];
                return styleSheet;
            }
            return styleSheet;
        }
    };
    return cssr;
}
