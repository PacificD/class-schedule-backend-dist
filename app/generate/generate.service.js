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
const classifyDB_service_1 = require("../classifyDB/classifyDB.service");
const Week_1 = require("../courses/pojo/Week");
const coursesDB_service_1 = require("../coursesDB/coursesDB.service");
const generate_classify_template_1 = require("./template/generate-classify.template");
const uuid_1 = require("uuid");
const Course_1 = require("../courses/pojo/Course");
const duringTime_template_1 = require("./template/duringTime.template");
const generateCoursesData_1 = require("../utils/generateCoursesData");
let GenerateService = class GenerateService {
    constructor(coursesDBService, classifyDBService) {
        this.coursesDBService = coursesDBService;
        this.classifyDBService = classifyDBService;
    }
    async generate(userId) {
        const classifyTemplate = Array.from(generate_classify_template_1.default.keys()), classifyTemplateLength = classifyTemplate.length;
        await classifyTemplate.forEach(async (classify) => {
            await this.classifyDBService.dbService.addOne('classify', {
                id: (0, uuid_1.v1)(),
                course: classify,
                userId: userId
            });
        });
        for (let i = 1; i <= 20; i++) {
            const data = [];
            for (let i = 1; i <= 7; i++) {
                const date = generateCoursesData_1.numberDateMapper.get(i), courses = [];
                const coursesNum = (date === 'Saturday' || date === 'Sunday') ?
                    [0, 0, 0, 0, 1][Math.round(Math.random() * 4)]
                    : [0, 1, 2, 2, 3, 3, 4, 5][Math.round(Math.random() * 7)];
                const timeList = [];
                for (let i = 0; i < coursesNum; i++) {
                    let time = duringTime_template_1.default[Math.round(Math.random() * 4)];
                    while (true) {
                        if (timeList.every((atime) => atime.startTime !== time.startTime)) {
                            timeList.push(time);
                            break;
                        }
                        else {
                            time = duringTime_template_1.default[Math.round(Math.random() * 4)];
                        }
                    }
                }
                timeList.sort((time1, time2) => {
                    if (time1.startTime > time2.startTime) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                });
                for (let i = 0; i < coursesNum; i++) {
                    let templateIndex = Math.round(Math.random() * classifyTemplateLength);
                    templateIndex === classifyTemplateLength && templateIndex--;
                    const classifyName = classifyTemplate[templateIndex];
                    let classifyId = '';
                    await this.classifyDBService.dbService.getByOption('classify', {
                        course: classifyName,
                        userId: userId
                    }).then(res => {
                        if (res.id)
                            classifyId = res.id;
                    });
                    const course = new Course_1.default((0, uuid_1.v1)(), classifyName, classifyId, timeList[i].startTime, timeList[i].endTime, generate_classify_template_1.default.get(classifyName));
                    courses.push(course);
                }
                data.push({
                    date: date,
                    courses: courses
                });
            }
            const week = new Week_1.default(i, userId, data);
            await this.coursesDBService.dbService.addOne('weeks', week);
        }
        return 'successfully generate!';
    }
};
GenerateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [coursesDB_service_1.default,
        classifyDB_service_1.default])
], GenerateService);
exports.default = GenerateService;
//# sourceMappingURL=generate.service.js.map