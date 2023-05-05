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
