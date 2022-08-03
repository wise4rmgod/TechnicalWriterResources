"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapElement = void 0;
function unwrapElement(target) {
    if (typeof target === 'string')
        return document.querySelector(target);
    if (typeof target === 'function')
        return target();
    return target;
}
exports.unwrapElement = unwrapElement;
