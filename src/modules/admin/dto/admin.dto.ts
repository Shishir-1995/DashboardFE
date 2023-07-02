import { UserRole } from "modules/user/enum/user-role";

export interface GetRolesDto {
  type: UserRole;
  accessLevel: number;
  permissionsId: number;
}
