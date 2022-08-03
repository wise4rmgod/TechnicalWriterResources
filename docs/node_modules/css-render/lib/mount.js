"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mount = exports.unmount = void 0;
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const hash_1 = require("./hash");
const render_1 = require("./render");
const utils_1 = require("./utils");
if (typeof window !== 'undefined') {
    window.__cssrContext = {};
}
function unmount(intance, node, id) {
    const { els } = node;
    // If id is undefined, unmount all styles
    if (id === undefined) {
        els.forEach(utils_1.removeElement);
        node.els = [];
    }
    else {
        const target = (0, utils_1.queryElement)(id);
        // eslint-disable-next-line
        if (target && els.includes(target)) {
            (0, utils_1.removeElement)(target);
            node.els = els.filter((el) => el !== target);
        }
    }
}
exports.unmount = unmount;
function addElementToList(els, target) {
    els.push(target);
}
function mount(instance, node, id, props, head, silent, force, anchorMetaName, ssrAdapter
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) {
    if (silent && !ssrAdapter) {
        if (id === undefined) {
            // it is possible to use hash to get rid of the requirements of id
            // if you are interested in it, please create a pr
            // i have no time to impl it
            console.error('[css-render/mount]: `id` is required in `silent` mode.');
            return;
        }
        const cssrContext = window.__cssrContext;
        if (!cssrContext[id]) {
            cssrContext[id] = true;
            (0, render_1.render)(node, instance, props, silent);
        }
        return;
    }
    let style;
    if (id === undefined) {
        style = node.render(props);
        id = (0, hash_1.default)(style);
    }
    if (ssrAdapter) {
        ssrAdapter.adapter(id, style !== null && style !== void 0 ? style : node.render(props));
        return;
    }
    const queriedTarget = (0, utils_1.queryElement)(id);
    if (queriedTarget !== null && !force) {
        return queriedTarget;
    }
    const target = queriedTarget !== null && queriedTarget !== void 0 ? queriedTarget : (0, utils_1.createElement)(id);
    if (style === undefined)
        style = node.render(props);
    target.textContent = style;
    if (queriedTarget !== null)
        return queriedTarget;
    if (anchorMetaName) {
        const anchorMetaEl = document.head.querySelector(`meta[name="${anchorMetaName}"]`);
        if (anchorMetaEl) {
            document.head.insertBefore(target, anchorMetaEl);
            addElementToList(node.els, target);
            return target;
        }
    }
    if (head) {
        document.head.insertBefore(target, document.head.querySelector('style, link'));
    }
    else {
        document.head.appendChild(target);
    }
    addElementToList(node.els, target);
    return target;
}
exports.mount = mount;
