import { Role, useGetUserRolesQuery } from "@/services/Account/accountApi";
import { FC, ReactElement } from "react";

type WithPermissionProps = {
  roles: Role[];
  children: ReactElement<any, any>;
};

const WithPermission: FC<WithPermissionProps> = ({ roles, children }) => {
  const { data } = useGetUserRolesQuery();
  const rolesIntersection = roles.map((role) => {
    if (data) {
      return data[`is${role}`];
    }
  });

  return rolesIntersection.indexOf(true) !== -1 ? children : null;
};

export default WithPermission;
