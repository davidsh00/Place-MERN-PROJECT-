import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { authContext } from "../../context/auth-context";
const NavLinks = ({ onClick }) => {
  const auth = useContext(authContext);
  return (
    <ul className="nav-link">
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {auth.isLoggedIn && (
        <>
          <li>
            <NavLink to="/places/new">ADD PLACES</NavLink>
          </li>
          <li>
            <NavLink to={`/${auth.user.id}/places`}>MY PLACES</NavLink>
          </li>
          <li>
            <button className="link" onClick={auth.logout}>
              LogOut
            </button>
          </li>
        </>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
    </ul>
  );
};
export default NavLinks;
