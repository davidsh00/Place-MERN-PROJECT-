import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";
import SidebarDrawer from "./SideDrawer";
import BackDrop from "../UIElements/BackDrop";


const MainNavigation = () => {

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
          <Link to="/">Your Places</Link>
        </h1>
        <nav>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
