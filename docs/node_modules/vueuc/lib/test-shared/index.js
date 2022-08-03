"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleepFrame = exports.sleep = exports.mount = void 0;
const vue_1 = require("vue");
function mount(comp, options = {}) {
    const { props = {}, attach = false } = options;
    const div = document.createElement('div');
    if (attach) {
        document.body.appendChild(div);
    }
    const app = (0, vue_1.createApp)(Object.assign({ render() {
            return null;
        } }, comp), props);
    const instance = app.mount(div);
    return {
        app,
        instance,
        unmount: () => {
            app.unmount();
            if (attach) {
                document.body.removeChild(div);
            }
        }
    };
}
exports.mount = mount;
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    });
}
exports.sleep = sleep;
function sleepFrame() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve) => {
            requestAnimationFrame(() => resolve());
        });
    });
}
exports.sleepFrame = sleepFrame;
