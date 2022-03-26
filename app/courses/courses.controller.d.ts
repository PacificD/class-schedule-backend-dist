import CoursesService from "./courses.service";
import AddCourseDto from "./dto/add-course.dto";
import UpdateCourseDto from "./dto/update-course.dto";
export default class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    getWeeklyCourses(week: number, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    addCourse(addCourseDto: AddCourseDto, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    deleteCourse(courseId: string, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
    updateCourse(updateCourseDto: UpdateCourseDto, headers: Record<string, string>): Promise<import("../config/resultType").Result>;
}
