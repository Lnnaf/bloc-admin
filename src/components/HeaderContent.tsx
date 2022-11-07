import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";

interface HeaderContentProps {
    icon: any;
    title: string;
    description: string;
}

const HeaderContent: FunctionComponent<HeaderContentProps> = (props) => {
    return (
        <header className="page-header page-header-dark bg-gradient-primary-to-secondary mb-4">
            <div className="container-xl px-4">
                <div className="page-header-content pt-4">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-auto mt-4">
                            <h1 className="page-header-title">
                                <div className="page-header-icon">
                                    <FontAwesomeIcon icon={props.icon} />
                                </div>
                                {props.title}
                            </h1>
                            <div className="page-header-subtitle">{props.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderContent;