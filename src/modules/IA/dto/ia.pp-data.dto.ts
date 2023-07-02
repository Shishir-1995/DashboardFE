import { CourseType } from "modules/common/enum/course-type.enum";

export class IAPPInfo {
  id: number;
  studentEmail: string;
  iaEmail: string;
  type: string;
  slotDate: Date;
  courseType: CourseType;
  course: string;
  topic: string;
  batch: string;
  studentFeedback: string;
  iaFeedback: string;
  meetingLink: string;
}
