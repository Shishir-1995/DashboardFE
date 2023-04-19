import { UserRole } from "modules/user/enum/user-role";
import React from "react";

interface Props {
  children: React.ReactElement;
  privileges: UserRole[];
}

const Authz: React.FC<Props> = ({ children, privileges }) => {
  const activeUserRole = UserRole.Student; //useAppSelector(AuthSelector.role);

  if (privileges?.includes(activeUserRole)) {
    return children;
  }

  return null;
};

export default Authz;
