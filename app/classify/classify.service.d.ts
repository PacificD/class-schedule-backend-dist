import { Result } from "src/config/resultType";
import ClassifyDto from "./dto/classify.dto";
import { UserService } from "src/user/user.service";
import ClassifyDBService from "src/classifyDB/classifyDB.service";
export default class ClassifyService {
    private readonly userService;
    private readonly classifyDBService;
    private readonly COLLECTION_NAME;
    private result;
    constructor(userService: UserService, classifyDBService: ClassifyDBService);
    private getUserIdByToken;
    checkClassify(classifyId: string, headers: Record<string, string>): Promise<string>;
    getClassifyIdByName(course: string): Promise<string>;
    addClassify(classifyDto: ClassifyDto, headers: Record<string, string>): Promise<Result>;
    deleteClassify(classifyId: string, headers: Record<string, string>): Promise<Result>;
    getClassify(headers: Record<string, string>): Promise<Result>;
}
