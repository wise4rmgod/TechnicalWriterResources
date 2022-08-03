"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssRender = void 0;
const c_1 = require("./c");
const utils_1 = require("./utils");
function CssRender(config = {}) {
    let styleSheet = null;
    const cssr = {
        c: ((...args) => (0, c_1.c)(cssr, ...args)),
        use: (plugin, ...args) => plugin.install(cssr, ...args),
        find: utils_1.queryElement,
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
exports.CssRender = CssRender;
