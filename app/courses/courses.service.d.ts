import ClassifyService from "src/classify/classify.service";
import { Result } from "src/config/resultType";
import CoursesDBService from "src/coursesDB/coursesDB.service";
import { UserService } from "src/user/user.service";
import AddCourseDto from "./dto/add-course.dto";
import UpdateCourseDto from "./dto/update-course.dto";
export default class CoursesService {
    private readonly coursesDBService;
    private readonly classifyService;
    private readonly userService;
    private readonly COLLECTION_NAME;
    private result;
    constructor(coursesDBService: CoursesDBService, classifyService: ClassifyService, userService: UserService);
    private getUserIdByToken;
    getWeeklyCourse(week: number, headers: Record<string, string>): Promise<Result>;
    addCourse(addCourseDto: AddCourseDto, headers: Record<string, string>): Promise<Result>;
    deleteCourse(courseId: string, headers: Record<string, string>): Promise<Result>;
    updateCourse(updateCourseDto: UpdateCourseDto, headers: Record<string, string>): Promise<Result>;
}
