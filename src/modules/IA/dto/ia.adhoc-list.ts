import { CourseType } from "modules/common/enum/course-type.enum";

export class IaAdhocBooking {

    id: number;
    studentId: number;
    iaId: number;
    topic: string;
    batch: string;
    studentFeedback: string;
    description: string;
    iaFeedback: string;
    isApproved: boolean;
    isCompleted: boolean;
    type: string;
    SlotDate: Date;
    courseType: CourseType;
    course: string;

}