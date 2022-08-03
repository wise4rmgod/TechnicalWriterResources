let maybeTouch;
export function ensureMaybeTouch() {
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
let wheelScale;
export function ensureWheelScale() {
    if (wheelScale === undefined) {
        wheelScale = 'chrome' in window
            ? window.devicePixelRatio
            : 1;
    }
    return wheelScale;
}
