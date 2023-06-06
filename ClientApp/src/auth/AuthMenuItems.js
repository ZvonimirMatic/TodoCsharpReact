import { AuthUrls, UserDisplayClaim } from "./AuthConstants";
import { getUserClaims } from "./AuthUtils";
import { useRequest } from "ahooks";
import { NavItem, NavLink } from 'reactstrap';

export default function AuthMenu() {
    const { data } = useRequest(getUserClaims);
    
    return (
        <>
            {data && (
                <NavItem>
                    <NavLink className="text-dark" href={AuthUrls.Manage}>Hello {data[UserDisplayClaim]}</NavLink>
                </NavItem>
            )}
            
            <NavItem>
                <NavLink className="text-dark" href={AuthUrls.Logout}>Logout</NavLink>
            </NavItem>
        </>
    );
}