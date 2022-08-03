"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureWheelScale = exports.ensureMaybeTouch = void 0;
let maybeTouch;
function ensureMaybeTouch() {
    if (maybeTouch === undefined) {
        if ('matchMedia' in window) {
            maybeTouch = window.matchMedia('(pointer:coarse)').matches;
        }
        else {
            maybeTouch = false;
        }
    }
    return maybeTouch;
}
exports.ensureMaybeTouch = ensureMaybeTouch;
let wheelScale;
function ensureWheelScale() {
    if (wheelScale === undefined) {
        wheelScale = 'chrome' in window
            ? window.devicePixelRatio
            : 1;
    }
    return wheelScale;
}
exports.ensureWheelScale = ensureWheelScale;
