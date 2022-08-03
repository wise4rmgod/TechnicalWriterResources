"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.indexMap = exports.repeat = exports.createId = void 0;
function createId(length = 8) {
    return Math.random()
        .toString(16)
        .slice(2, 2 + length);
}
exports.createId = createId;
function repeat(count, v) {
    const ret = [];
    for (let i = 0; i < count; ++i) {
        ret.push(v);
    }
    return ret;
}
exports.repeat = repeat;
function indexMap(count, createValue) {
    const ret = [];
    if (!createValue) {
        for (let i = 0; i < count; ++i) {
            ret.push(i);
        }
        return ret;
    }
    for (let i = 0; i < count; ++i) {
        ret.push(createValue(i));
    }
    return ret;
}
exports.indexMap = indexMap;
async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
