"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTo = void 0;
function resolveTo(selector) {
    if (typeof selector === 'string') {
        return document.querySelector(selector);
    }
    return selector();
}
exports.resolveTo = resolveTo;
