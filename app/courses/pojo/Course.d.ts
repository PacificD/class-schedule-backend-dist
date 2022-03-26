export default class Course {
    readonly id: string;
    course: string;
    classifyId: string;
    startTime: string;
    endTime: string;
    location: string;
    constructor(id: string, course: string, classifyId: string, startTime: string, endTime: string, location: string);
    update(course: string, classifyId: string, startTime: string, endTime: string, location: string): void;
}
