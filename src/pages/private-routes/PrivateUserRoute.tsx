import { PrivateRouteProps } from '../../types/props-types/PrivateRouteProps';
import { getTokens } from '../../service/utils/authUtils';

const PrivateUserRoute = ({ component, errorComponent }: PrivateRouteProps) => {
  const role = getTokens()?.role;

  return role === "ROLE_USER" ? component : errorComponent;
};
export default PrivateUserRoute