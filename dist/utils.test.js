"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
test("It capitalise the first letter of the string", () => {
    expect((0, utils_1.capitaliseCity)("oslo")).toBe("Oslo");
});
test("The query does not accept only one city", () => {
    expect((0, utils_1.queryRegex)("oslo")).toBe(false);
});
test("The query does not accept comma separator", () => {
    expect((0, utils_1.queryRegex)("oslo,rome")).toBe(false);
});
test("Passes when 2 cities are divided from a dash", () => {
    expect((0, utils_1.queryRegex)("oslo-rome")).toBe(true);
});
//# sourceMappingURL=utils.test.js.map