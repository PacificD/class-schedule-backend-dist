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
const resultType_1 = require("../config/resultType");
const lowdb_service_1 = require("../lowdb/lowdb.service");
const uuid_1 = require("uuid");
const Classify_1 = require("./pojo/Classify");
const user_service_1 = require("../user/user.service");
const classifyDB_service_1 = require("../classifyDB/classifyDB.service");
let ClassifyService = class ClassifyService {
    constructor(userService, classifyDBService) {
        this.userService = userService;
        this.classifyDBService = classifyDBService;
        this.COLLECTION_NAME = 'classify';
        this.classifyDBService.dbService = new lowdb_service_1.LowdbService(this.COLLECTION_NAME);
    }
    async getUserIdByToken(headers) {
        let userId;
        await this.userService.getUserInfo(headers.token).then(res => {
            userId = res.id;
        });
        return userId;
    }
    async checkClassify(classifyId, headers) {
        let checkResult = '';
        const userId = await this.getUserIdByToken(headers);
        await this.classifyDBService.dbService.getByOption(this.COLLECTION_NAME, { id: classifyId }).then(res => {
            if (res.id && userId === res.userId) {
                checkResult = res.course;
            }
        });
        return checkResult;
    }
    async getClassifyIdByName(course) {
        let result = '';
        await this.classifyDBService.dbService.getByOption(this.COLLECTION_NAME, { course: course }).then(res => {
            if (res.id) {
                result = res.id;
            }
        });
        return result;
    }
    async addClassify(classifyDto, headers) {
        const userId = await this.getUserIdByToken(headers);
        const classify = new Classify_1.default((0, uuid_1.v1)(), classifyDto.course, userId);
        let isClassifyExisted = false;
        await this.classifyDBService.dbService.getAll(this.COLLECTION_NAME).then(listData => {
            listData.forEach(data => {
                if (data.course === classifyDto.course && data.userId === userId) {
                    isClassifyExisted = true;
                }
            });
        });
        if (isClassifyExisted) {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "该课程分类已存在!");
        }
        else {
            await this.classifyDBService.dbService.addOne(this.COLLECTION_NAME, classify).then(res => {
                this.result = resultType_1.Result.successWithCustomCode(resultType_1.statusCodeEnum.CREATED, {
                    id: res.id,
                    course: res.course
                });
            });
        }
        return this.result;
    }
    async deleteClassify(classifyId, headers) {
        const userId = await this.getUserIdByToken(headers);
        const searchRes = await this.classifyDBService.dbService.getByOption(this.COLLECTION_NAME, {
            id: classifyId
        });
        if (searchRes.id) {
            if (searchRes.userId !== userId) {
                this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "非法操作!");
            }
            else {
                await this.classifyDBService.dbService.delByOption(this.COLLECTION_NAME, {
                    id: classifyId
                }).then(res => {
                    this.result = resultType_1.Result.success('删除成功');
                });
            }
        }
        else {
            this.result = resultType_1.Result.fail(resultType_1.statusCodeEnum.BAD_REQUEST, "该课程不存在!");
        }
        return this.result;
    }
    async getClassify(headers) {
        const userId = await this.getUserIdByToken(headers);
        const listData = await this.classifyDBService.dbService.getAll(this.COLLECTION_NAME), resData = [];
        listData.forEach((data) => {
            if (data.userId === userId)
                resData.push({
                    id: data.id,
                    course: data.course
                });
        });
        this.result = resultType_1.Result.success(resData);
        return this.result;
    }
};
ClassifyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        classifyDB_service_1.default])
], ClassifyService);
exports.default = ClassifyService;
//# sourceMappingURL=classify.service.js.map