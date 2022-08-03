"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = void 0;
function warn(location, message) {
    console.error(`[vueuc/${location}]: ${message}`);
}
exports.warn = warn;
