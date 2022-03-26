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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const classify_service_1 = require("../classify/classify.service");
const resultType_1 = require("../config/resultType");
const coursesDB_service_1 = require("../coursesDB/coursesDB.service");
const user_service_1 = require("../user/user.service");
const generateCoursesData_1 = require("../utils/generateCoursesData");
const validateTime_1 = require("../utils/validateTime");
const uuid_1 = require("uuid");
const Course_1 = require("./pojo/Course");
let CoursesService = class CoursesService {
    constructor(coursesDBService, classifyService, userService) {
        this.coursesDBService = coursesDBService;
        this.classifyService = classifyService;
        this.userService = userService;
        this.COLLECTION_NAME = 'weeks';
    }
    async getUserIdByToken(headers) {
        let userId;
        await this.userService.getUserInfo(headers.token).then(res => {
            userId = res.id;
        });
        return userId;
    }
    async getWeeklyCourse(week, headers) {
        const userId = await this.getUserIdByToken(headers);
        if (week > 20 || week < 1) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "week必须在1~20之间!");
            return this.result;
        }
        const ListData = await this.coursesDBService.dbService.getByOption(this.COLLECTION_NAME, {
            week: week,
            userId: userId
        });
        this.result = resultType_1.Result.success(ListData.data);
        return this.result;
    }
    async addCourse(addCourseDto, headers) {
        const userId = await this.getUserIdByToken(headers);
        const week = Math.floor(Number(addCourseDto.week)), date = Math.floor(Number(addCourseDto.date)), { classifyId, startTime, endTime, location } = addCourseDto;
        let isClassifyExisted = false, courseName;
        if (week > 20 || week < 1) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "week必须在1~20之间!");
            return this.result;
        }
        if (date > 7 || date < 1) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "date必须在1~7之间!");
            return this.result;
        }
        if (!(0, validateTime_1.default)(startTime) || !(0, validateTime_1.default)(endTime)) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "时间格式不正确！请传入正确的时间格式，如：2020-04-10 09:30");
            return this.result;
        }
        if (endTime <= startTime) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "时间范围不正确！");
            return this.result;
        }
        await this.classifyService.checkClassify(classifyId, headers).then(res => {
            if (res !== '') {
                isClassifyExisted = true;
                courseName = res;
            }
        });
        if (!isClassifyExisted) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "该课程类别不存在!");
            return this.result;
        }
        const weekData = await this.coursesDBService.dbService.getByOption(this.COLLECTION_NAME, {
            week: week,
            userId: userId
        });
        weekData.data.forEach((data) => {
            if (data.date === generateCoursesData_1.numberDateMapper.get(Number(addCourseDto.date))) {
                data.courses.push(new Course_1.default((0, uuid_1.v1)(), courseName, classifyId, startTime, endTime, location));
            }
        });
        const listData = await this.coursesDBService.dbService.getAll(this.COLLECTION_NAME);
        listData.forEach((list) => {
            if (list.week === week && list.userId === userId) {
                list = weekData;
            }
        });
        await this.coursesDBService.dbService.setData(this.COLLECTION_NAME, listData).then(res => {
            res && (this.result = resultType_1.Result.successWithCustomCode(resultType_1.statusCodeEnum.CREATED, '添加成功!'));
        });
        return this.result;
    }
    async deleteCourse(courseId, headers) {
        const userId = await this.getUserIdByToken(headers);
        const week = await this.coursesDBService.dbService.getByOption(this.COLLECTION_NAME, {
            data: [{ courses: [{ id: courseId }] }]
        });
        let newcourses, indexOfDeletedDate;
        if (!week || !week.data) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "该课程不存在!");
            return this.result;
        }
        week.data.forEach((courseData) => {
            for (const course of courseData.courses) {
                if (course.id === courseId) {
                    indexOfDeletedDate = Number(generateCoursesData_1.numberDateMapper.get(courseData.date)) - 1;
                    newcourses = courseData.courses.filter((course) => { if (course.id !== courseId)
                        return course; });
                    break;
                }
            }
        });
        week.data[indexOfDeletedDate].courses = newcourses;
        this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.INTERNAL_SERVER_ERROR, '删除失败!');
        let weeks = await this.coursesDBService.dbService.getAll(this.COLLECTION_NAME);
        weeks = weeks.map((oldWeek) => {
            if (oldWeek.week === week.week && oldWeek.userId === userId) {
                return week;
            }
            return oldWeek;
        });
        await this.coursesDBService.dbService.setData(this.COLLECTION_NAME, weeks).then(res => {
            res && (this.result = resultType_1.Result.success('删除成功!'));
        });
        return this.result;
    }
    async updateCourse(updateCourseDto, headers) {
        const userId = await this.getUserIdByToken(headers), { id, classifyId, startTime, endTime, location } = updateCourseDto;
        let courseName, isClassifyExisted = false, indexOfUpateDate;
        if (!(0, validateTime_1.default)(startTime) || !(0, validateTime_1.default)(endTime)) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "时间格式不正确！请传入正确的时间格式，如：2020-04-10 09:30");
            return this.result;
        }
        await this.classifyService.checkClassify(classifyId, headers).then(res => {
            if (res !== '') {
                isClassifyExisted = true;
                courseName = res;
            }
        });
        if (!isClassifyExisted) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "该课程类别不存在!");
            return this.result;
        }
        const week = await this.coursesDBService.dbService.getByOption(this.COLLECTION_NAME, {
            data: [{ courses: [{ id: id }] }]
        });
        if (!week || !week.data) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "该课程不存在!");
            return this.result;
        }
        week.data.forEach((courseData) => {
            for (const course of courseData.courses) {
                if (course.id === id) {
                    indexOfUpateDate = Number(generateCoursesData_1.numberDateMapper.get(courseData.date)) - 1;
                    course.classifyId = classifyId;
                    course.course = courseName;
                    course.startTime = startTime;
                    course.endTime = endTime;
                    course.location = location;
                    break;
                }
            }
        });
        this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.INTERNAL_SERVER_ERROR, '更新失败!');
        let weeks = await this.coursesDBService.dbService.getAll(this.COLLECTION_NAME);
        weeks = weeks.map((oldWeek) => {
            if (oldWeek.week === week.week && oldWeek.userId === userId) {
                return week;
            }
            return oldWeek;
        });
        await this.coursesDBService.dbService.setData(this.COLLECTION_NAME, weeks).then(res => {
            res && (this.result = resultType_1.Result.success('更新成功!'));
        });
        return this.result;
    }
};
CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [coursesDB_service_1.default,
        classify_service_1.default,
        user_service_1.UserService])
], CoursesService);
exports.default = CoursesService;
//# sourceMappingURL=courses.service.js.map