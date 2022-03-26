"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCoursesData = exports.numberDateMapper = void 0;
const dateEnum_1 = require("../courses/type/dateEnum");
exports.numberDateMapper = new Map([
    [1, dateEnum_1.DateEnum.MON],
    [2, dateEnum_1.DateEnum.TUES],
    [3, dateEnum_1.DateEnum.WEDNES],
    [4, dateEnum_1.DateEnum.THURS],
    [5, dateEnum_1.DateEnum.FRI],
    [6, dateEnum_1.DateEnum.SATUR],
    [7, dateEnum_1.DateEnum.SUN],
    [dateEnum_1.DateEnum.MON, 1],
    [dateEnum_1.DateEnum.TUES, 2],
    [dateEnum_1.DateEnum.WEDNES, 3],
    [dateEnum_1.DateEnum.THURS, 4],
    [dateEnum_1.DateEnum.FRI, 5],
    [dateEnum_1.DateEnum.SATUR, 6],
    [dateEnum_1.DateEnum.SUN, 7],
]);
function generateCoursesData() {
    const coursesDate = [];
    for (let i = 1; i <= 7; i++) {
        coursesDate.push({
            date: exports.numberDateMapper.get(i),
            courses: []
        });
    }
    return coursesDate;
}
exports.generateCoursesData = generateCoursesData;
//# sourceMappingURL=generateCoursesData.js.map