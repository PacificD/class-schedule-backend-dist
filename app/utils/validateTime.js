"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateTime(datetime) {
    const REGEX = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/;
    if (!REGEX.test(datetime)) {
        return false;
    }
    return true;
}
exports.default = validateTime;
//# sourceMappingURL=validateTime.js.map