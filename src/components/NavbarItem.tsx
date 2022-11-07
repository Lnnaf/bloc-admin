import React, { FunctionComponent } from "react";

interface NavBarItemProps { }

 
const NavBarItem: FunctionComponent<NavBarItemProps> = () => {
    const [isUserDropShow, setUserDropShow] = React.useState<boolean>(false)

    const showUserDrop = () =>  setUserDropShow(!isUserDropShow );
         
    return ( 
        <ul className="navbar-nav align-items-center ms-auto">
                {/* <!-- User Dropdown--> */}
                <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
                    <a
                        className="btn btn-icon btn-transparent-dark dropdown-toggle"
                        id="navbarDropdownUserImage"
                        onClick={showUserDrop}
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <img
                            className="img-fluid"
                            src="./assets/img/illustrations/profiles/profile-1.png"
                        />
                    </a>
                    <div
                        className={
                            "dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up " + (isUserDropShow ? "show" : "")
                        }
                        aria-labelledby="navbarDropdownUserImage"
                    >
                        <h6 className="dropdown-header d-flex align-items-center">
                            <img
                                title="1"
                                className="dropdown-user-img"
                                src={`./assets/img/illustrations/profiles/profile-1.png`}
                            />
                            <div className="dropdown-user-details">
                                <div className="dropdown-user-details-name">Valerie Luna</div>
                                <div className="dropdown-user-details-email">vluna@aol.com</div>
                            </div>
                        </h6>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#!">
                            <div className="dropdown-item-icon">
                                <i data-feather="settings"></i>
                            </div>
                            Account
                        </a>
                        <a className="dropdown-item" href="#!">
                            <div className="dropdown-item-icon">
                                <i data-feather="log-out"></i>
                            </div>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
     );
}

 
export default NavBarItem;

// class NavBarItem extends React.Component<NavBarItemProps, NavBarItemState> {
     
//     constructor(props:any) {
//         super(props);
//         this.state = { isUserDropShow: false };
//         this.showUserDrop = this.showUserDrop.bind(this);
//     }
    
//     showUserDrop() {
//         this.setState({ isUserDropShow: !this.state.isUserDropShow });
//     }

//     render() {
//         return (
            
//         );
//     }
// }

// export default NavBarItem;
