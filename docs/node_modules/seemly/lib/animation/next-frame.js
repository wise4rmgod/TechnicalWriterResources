"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeNextFrame = void 0;
let cbs = [];
let params = [];
function flushCallbacks() {
    cbs.forEach((cb, i) => cb(...params[i]));
    cbs = [];
    params = [];
}
function beforeNextFrame(cb, ...args) {
    cbs.push(cb) === 1 && requestAnimationFrame(flushCallbacks);
    params.push(args);
}
exports.beforeNextFrame = beforeNextFrame;
