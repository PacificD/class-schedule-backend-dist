"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const courses_service_1 = require("./courses.service");
const add_course_dto_1 = require("./dto/add-course.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
let CoursesController = class CoursesController {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    async getWeeklyCourses(week, headers) {
        return this.coursesService.getWeeklyCourse(Math.floor(Number(week)), headers);
    }
    async addCourse(addCourseDto, headers) {
        return this.coursesService.addCourse(addCourseDto, headers);
    }
    async deleteCourse(courseId, headers) {
        return this.coursesService.deleteCourse(courseId, headers);
    }
    async updateCourse(updateCourseDto, headers) {
        return this.coursesService.updateCourse(updateCourseDto, headers);
    }
};
__decorate([
    (0, common_1.Get)(':week'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('week')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getWeeklyCourses", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_course_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "addCourse", null);
__decorate([
    (0, common_1.Delete)(':courseId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "deleteCourse", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_course_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "updateCourse", null);
CoursesController = __decorate([
    (0, common_1.Controller)('/course'),
    __metadata("design:paramtypes", [courses_service_1.default])
], CoursesController);
exports.default = CoursesController;
//# sourceMappingURL=courses.controller.js.map