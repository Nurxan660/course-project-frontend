import { PrivateRouteProps } from '../../types/props-types/PrivateRouteProps';
import { getTokens } from '../../service/utils/authUtils';

const PrivateAdminRoute = ({ component, errorComponent }: PrivateRouteProps) => {
  const role = getTokens()?.role;

  return role === "ROLE_ADMIN" ? component : errorComponent;
};
export default PrivateAdminRoute