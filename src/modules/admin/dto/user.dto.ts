import { CourseType } from "modules/common/enum/course-type.enum";
import { UserRole } from "modules/user/enum/user-role";

export interface CreateUserDto {
  userEmail: string;
  userName: string;
  roleToAssign: UserRole;
  userCourseType: CourseType;
  userCourse: string;
}
