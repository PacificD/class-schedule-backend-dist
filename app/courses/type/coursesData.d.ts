import Course from "../pojo/Course";
import { DateEnum } from "./dateEnum";
export default interface ICoursesData {
    date: DateEnum;
    courses: Array<Course>;
}
