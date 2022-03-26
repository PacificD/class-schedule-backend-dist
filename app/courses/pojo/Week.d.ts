import ICoursesData from "../type/coursesData";
import { DateEnum } from "../type/dateEnum";
import Course from "./Course";
export default class Week {
    readonly week: number;
    readonly userId: string;
    data: Array<ICoursesData>;
    constructor(week: number, userId: string, data: Array<ICoursesData>);
    changeDailyCourses(date: DateEnum, courses: Array<Course>): void;
}
