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
const classify_service_1 = require("./classify.service");
const classify_dto_1 = require("./dto/classify.dto");
let ClassifyController = class ClassifyController {
    constructor(classifyService) {
        this.classifyService = classifyService;
    }
    async getClassify(headers) {
        return this.classifyService.getClassify(headers);
    }
    async addClassify(ClassifyDto, headers) {
        return this.classifyService.addClassify(ClassifyDto, headers);
    }
    async deleteClassify(classifyId, headers) {
        return this.classifyService.deleteClassify(classifyId, headers);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassifyController.prototype, "getClassify", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [classify_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], ClassifyController.prototype, "addClassify", null);
__decorate([
    (0, common_1.Delete)(':classifyId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('classifyId')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClassifyController.prototype, "deleteClassify", null);
ClassifyController = __decorate([
    (0, common_1.Controller)('/classify'),
    __metadata("design:paramtypes", [classify_service_1.default])
], ClassifyController);
exports.default = ClassifyController;
//# sourceMappingURL=classify.controller.js.map