import { FunctionComponent, useState } from "react";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import HeaderContent from "../components/HeaderContent";
import PostTable from "../components/table/Post.table";

import 'react-toastify/dist/ReactToastify.css';






interface ListsPostPageProps {

}



const ListsPostPage: FunctionComponent<ListsPostPageProps> = () => {

    return (
        <>
            <div id="layoutSidenav_content">
                <main>
                    <HeaderContent icon={faFileLines} title="Posts" description="123" />
                    <div className="container-xl px-4">
                        <div className="card mb-4 d-grid">
                            <div className="card-header">
                                <p>Post Data Control Table</p>

                            </div>
                            <div className="card-body">
                                <PostTable />
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </>
    );
}

export default ListsPostPage;