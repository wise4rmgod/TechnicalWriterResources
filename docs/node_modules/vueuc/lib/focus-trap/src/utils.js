"use strict";
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// ref https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/js/dialog.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.focusLastDescendant = exports.focusFirstDescendant = void 0;
function isHTMLElement(node) {
    return node instanceof HTMLElement;
}
function focusFirstDescendant(node) {
    for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        if (isHTMLElement(child)) {
            if (attemptFocus(child) || focusFirstDescendant(child)) {
                return true;
            }
        }
    }
    return false;
}
exports.focusFirstDescendant = focusFirstDescendant;
function focusLastDescendant(element) {
    for (let i = element.childNodes.length - 1; i >= 0; i--) {
        const child = element.childNodes[i];
        if (isHTMLElement(child)) {
            if (attemptFocus(child) || focusLastDescendant(child)) {
                return true;
            }
        }
    }
    return false;
}
exports.focusLastDescendant = focusLastDescendant;
function attemptFocus(element) {
    if (!isFocusable(element)) {
        return false;
    }
    try {
        element.focus({ preventScroll: true });
    }
    catch (e) { }
    return document.activeElement === element;
}
function isFocusable(element) {
    if (element.tabIndex > 0 ||
        (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
        return true;
    }
    if (element.getAttribute('disabled')) {
        return false;
    }
    switch (element.nodeName) {
        case 'A':
            return (!!element.href &&
                element.rel !== 'ignore');
        case 'INPUT':
            return (element.type !== 'hidden' &&
                element.type !== 'file');
        case 'BUTTON':
        case 'SELECT':
        case 'TEXTAREA':
            return true;
        default:
            return false;
    }
}
