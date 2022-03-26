"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Week {
    constructor(week, userId, data) {
        this.week = week;
        this.userId = userId;
        this.data = data;
    }
    changeDailyCourses(date, courses) {
        this.data.forEach((dailyCourses) => {
            if (dailyCourses.date === date) {
                dailyCourses.courses = courses;
            }
        });
    }
}
exports.default = Week;
//# sourceMappingURL=Week.js.map