import { UserRole } from "modules/user/enum/user-role";
import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactElement;
  privileges: UserRole[];
}

const Authz: React.FC<Props> = ({ children, privileges }) => {
  const activeUserRole = UserRole.IA; //useAppSelector(AuthSelector.role);

  if (privileges?.includes(activeUserRole)) {
    return children;
  }

  return <Navigate to="/" />;
};

export default Authz;
