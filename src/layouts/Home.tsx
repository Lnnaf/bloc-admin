import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import React, { FunctionComponent } from "react";
import HeaderContent from "../components/HeaderContent";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    return (
        <div id="layoutSidenav_content">
            <main>
                <HeaderContent icon={faFileLines} title="Home" description="123" />
                <div className="container-xl px-4">

                </div>
            </main>
        </div>
    );
}

export default Home;