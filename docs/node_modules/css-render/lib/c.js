"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
const render_1 = require("./render");
const mount_1 = require("./mount");
function wrappedRender(props) {
    return (0, render_1.render)(this, this.instance, props);
}
// do not guard node calling, it should throw an error.
function wrappedMount(options = {}
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) {
    const { id, ssr, props, head = false, silent = false, force = false, anchorMetaName } = options;
    const targetElement = (0, mount_1.mount)(this.instance, this, id, props, head, silent, force, anchorMetaName, ssr);
    return targetElement;
}
function wrappedUnmount(options = {}) {
    /* istanbul ignore next */
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const { id } = options;
    (0, mount_1.unmount)(this.instance, this, id);
}
const createCNode = function (instance, $, props, children) {
    return {
        instance,
        $,
        props,
        children,
        els: [],
        render: wrappedRender,
        mount: wrappedMount,
        unmount: wrappedUnmount
    };
};
exports.c = function (instance, $, props, children) {
    if (Array.isArray($)) {
        return createCNode(instance, { $: null }, null, $);
    }
    else if (Array.isArray(props)) {
        return createCNode(instance, $, null, props);
    }
    else if (Array.isArray(children)) {
        return createCNode(instance, $, props, children);
    }
    else {
        return createCNode(instance, $, props, null);
    }
};
