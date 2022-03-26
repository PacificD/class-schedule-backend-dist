"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateModule = void 0;
const common_1 = require("@nestjs/common");
const classifyDB_module_1 = require("../classifyDB/classifyDB.module");
const coursesDB_module_1 = require("../coursesDB/coursesDB.module");
const generate_service_1 = require("./generate.service");
let GenerateModule = class GenerateModule {
};
GenerateModule = __decorate([
    (0, common_1.Module)({
        imports: [coursesDB_module_1.CoursesDBModule, classifyDB_module_1.ClassifyDBModule],
        providers: [generate_service_1.default],
        exports: [generate_service_1.default]
    })
], GenerateModule);
exports.GenerateModule = GenerateModule;
//# sourceMappingURL=generate.module.js.map