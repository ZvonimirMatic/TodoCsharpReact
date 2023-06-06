import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import AuthMenu from '../auth/AuthMenu';
import { useToggle } from 'ahooks';
import AuthorizeView from '../auth/AuthorizeView';

export default function NavMenu() {
  const [collapsed, { toggle }] = useToggle(true);

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/">TodoCsharpReact</NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
            </NavItem>
            <AuthorizeView authorizingComponent={null} unauthorizedComponent={null}>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
              </NavItem>
            </AuthorizeView>
            <AuthMenu />
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
}
