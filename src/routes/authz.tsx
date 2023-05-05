import { UserRole } from "modules/user/enum/user-role";
import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "utils/cookies/cookies";

interface Props {
  children: React.ReactElement;
  privileges: UserRole[];
}

const Authz: React.FC<Props> = ({ children, privileges }) => {
  const activeUserRole = getCookie("role") as UserRole;

  if (privileges?.includes(activeUserRole)) {
    return children;
  }

  return <Navigate to="/" />;
};

export default Authz;
