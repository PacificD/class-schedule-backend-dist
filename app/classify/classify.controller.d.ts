import ClassifyService from "./classify.service";
import ClassifyDto from "./dto/classify.dto";
export default class ClassifyController {
    private readonly classifyService;
    constructor(classifyService: ClassifyService);
    getClassify(headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    addClassify(ClassifyDto: ClassifyDto, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    deleteClassify(classifyId: string, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
}
