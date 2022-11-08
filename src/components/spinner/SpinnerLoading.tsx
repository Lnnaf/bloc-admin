import React from "react";
import { FunctionComponent } from "react";
import { Spinner } from "react-bootstrap";

import './Style.css'

interface SpinnerLoadingProps {
    isLoading: boolean;
}

const SpinnerLoading: FunctionComponent<SpinnerLoadingProps> = (props) => {

  return (
    <div className={"spinner-loading-container center-loading " + (props.isLoading ? "" : "hide")}>
      <Spinner animation="border" className="spinner-loading" role="status" />
    </div>
  );
}

export default SpinnerLoading;