import React, { FunctionComponent } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface SideBarMenuProps { }

interface SidBarMenuProps { }

const SidBarMenu: FunctionComponent<SidBarMenuProps> = () => {
  const [showDashboardItem, setShowDashboardItem] = React.useState<boolean>(false)

  const openDashboardItem = () =>setShowDashboardItem(!showDashboardItem)

  return (
    <div id="layoutSidenav_nav">
      <nav className="sidenav shadow-right sidenav-light">
        <div className="sidenav-menu">
          <div className="nav accordion" id="accordionSidenav">
            <div className="sidenav-menu-heading">Core</div>
            <a
              href="#"
              className={"nav-link " + (showDashboardItem ? "" : "collapsed")}
              onClick={openDashboardItem}
              data-bs-toggle="collapse"
              data-bs-target="#collapseDashboards"
              aria-expanded="false"
              aria-controls="collapseDashboards"
            >
              <div className="nav-link-icon">
                <i data-feather="activity"></i>
              </div>
              Dashboards
              <div className="sidenav-collapse-arrow">
                <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
              </div>
            </a>
            <div
              className={"collapse " + (showDashboardItem ? "show" : "")}
              id="collapseDashboards"
              data-bs-parent="#accordionSidenav"
            >
              <nav
                className="sidenav-menu-nested nav accordion"
                id="accordionSidenavPages"
              >
                <Link className="nav-link" to="posts">
                  Posts
                  <span className="badge bg-primary-soft text-primary ms-auto">
                    Updated
                  </span>
                </Link>
                <a className="nav-link" href="dashboard-2.html">
                  Multipurpose
                </a>
                <a className="nav-link" href="dashboard-3.html">
                  Affiliate
                </a>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SidBarMenu;
// class SideBarMenu extends React.Component<SideBarMenuProps, SideBarMenuState> {

//   constructor(props:any) {
//     super(props);
//     this.state = { showDashboardItem: false };
//     this.openDashboardItem = this.openDashboardItem.bind(this);
// }

//   openDashboardItem(){
//     console.log(2);

//     this.setState({ showDashboardItem: !this.state.showDashboardItem });
//   }

//   render() {
//     const isShowDashboardItem = this.state.showDashboardItem
//     return (

//     );
//   }
// }

// export default SideBarMenu;
