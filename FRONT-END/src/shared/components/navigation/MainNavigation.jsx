import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";
import SidebarDrawer from "./SideDrawer";
import BackDrop from "../UIElements/BackDrop";
import { authContext } from "../../context/auth-context";

const MainNavigation = () => {
  const auth = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    setIsOpenSideDrawer(false);
  }, [navigate]);
  const [isOpenSideDrawer, setIsOpenSideDrawer] = useState(false);
  function toggleSideDrawer() {
    setIsOpenSideDrawer((prev) => !prev);
  }
  function handleCloseDrawer() {
    setIsOpenSideDrawer(false);
  }
  return (
    <>
      {isOpenSideDrawer && <BackDrop onClick={handleCloseDrawer} />}
      <SidebarDrawer show={isOpenSideDrawer} closeDrawer={handleCloseDrawer}>
        <NavLinks onClick={handleCloseDrawer} />
      </SidebarDrawer>

      <MainHeader>
        <div className="menu-btn" onClick={toggleSideDrawer}>
          <span />
          <span />
          <span />
        </div>
        <h1 className="title">
          <Link to="/">
            Places{auth.isLoggedIn && ` (Hello ${auth.user.name})`}
          </Link>
        </h1>
        <nav>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
