import { AuthUrls } from "./AuthConstants";
import AuthorizeView from "./AuthorizeView";
import AuthMenuItems from "./AuthMenuItems";
import { NavItem, NavLink } from 'reactstrap';

export default function AuthMenu() {  
    return (
        <AuthorizeView
            authorizingComponent={null}
            unauthorizedComponent={(
                <>
                    <NavItem>
                        <NavLink className="text-dark" href={AuthUrls.Register}>Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="text-dark" href={AuthUrls.Login}>Login</NavLink>
                    </NavItem>
                </>
            )}
        >
            <AuthMenuItems />
        </AuthorizeView>
    );
}