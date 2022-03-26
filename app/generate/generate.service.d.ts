import ClassifyDBService from "src/classifyDB/classifyDB.service";
import CoursesDBService from "src/coursesDB/coursesDB.service";
export default class GenerateService {
    private readonly coursesDBService;
    private readonly classifyDBService;
    constructor(coursesDBService: CoursesDBService, classifyDBService: ClassifyDBService);
    generate(userId: string): Promise<string>;
}
