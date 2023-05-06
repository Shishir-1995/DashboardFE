import { UserRole } from "modules/user/enum/user-role";

export class LoginReqDto {
  email: string;

  password: string;
}

export class LoginResDto {
  role: UserRole;

  accessToken: string;

  name: string;
}

export class ProfileSuccessDto<T>{
  error : boolean
  data : T
}

export class StudentProfileDto {
    id : number
    studentCode : string
    email : string
    name : string
    password : string
    codingCourse : string
    dsaCourse : string
}

export class IAProfileDto {
  id: number
  email: string
  name: string
  password: string
  coding : true
  dsa : false
  codingCourse: string
  dsaCourse: string
}