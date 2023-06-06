import { Collapse, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import AuthMenu from '../auth/AuthMenu';
import { useToggle } from 'ahooks';

export default function NavMenu() {
  const [collapsed, { toggle }] = useToggle(true);

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/">TodoCsharpReact</NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
          <ul className="navbar-nav flex-grow">
            <AuthMenu />
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
}
