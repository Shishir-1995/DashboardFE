import { CourseType } from "modules/common/enum/course-type.enum";

export class BookSlotDto {
    courseType: CourseType
    type: "regular"
    slotId: number
    batch: string
    topic: string
}