import { CourseType } from "modules/common/enum/course-type.enum";

export class StudentBooking {
  id: number;
  studentEmail: string;
  iaId?: number;
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

export class StudentAdhocBooking {
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
