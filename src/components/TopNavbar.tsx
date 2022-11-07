import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import NavBarItem from "./NavbarItem";

interface TopNavBarProps {

}

const TopNavBar: FunctionComponent<TopNavBarProps> = () => {
  return (
    <nav
      className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white"
      id="sidenavAccordion"
    >
      <button
        className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0"
        id="sidebarToggle"
      >
        <i data-feather="menu"></i>
      </button>

      <Link className="navbar-brand pe-3 ps-4 ps-lg-2" to="">
        SB Admin Pro
      </Link>
      <form className="form-inline me-auto d-none d-lg-block me-3">
        <div className="input-group input-group-joined input-group-solid">
          <input
            className="form-control pe-0"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="input-group-text">
            <i data-feather="search"></i>
          </div>
        </div>
      </form>

      <NavBarItem></NavBarItem>
    </nav>
  );
}

export default TopNavBar;
