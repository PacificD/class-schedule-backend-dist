"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Course {
    constructor(id, course, classifyId, startTime, endTime, location) {
        this.id = id;
        this.course = course;
        this.classifyId = classifyId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
    }
    update(course, classifyId, startTime, endTime, location) {
        this.course = course;
        this.classifyId = classifyId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
    }
}
exports.default = Course;
//# sourceMappingURL=Course.js.map