import { CourseType } from "modules/common/enum/course-type.enum";

export class IAPPInfo {
    id: number;
    studentId: number;
    iaId: number;
    type: string;
    SlotDate: Date;
    courseType: CourseType;
    course: string;
    topic: string;
    batch: string;
    studentFeedback: string;
    iaFeedback: string;
}