import { FunctionComponent } from "react";
import { faFileLines, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import HeaderContent from "../components/HeaderContent";
import { Post } from "../interface/Post.object";
import PostService from "../services/PostService";
import { TimeHelper } from "../helper/TimeHelper";
import DataTable from "../components/DataTable";

import 'react-toastify/dist/ReactToastify.css';


interface ListsPostPageProps {

}



const ListsPostPage: FunctionComponent<ListsPostPageProps> = () => {
    const [posts, setPosts] = React.useState<Post[]>([])
    const [show, setShow] = React.useState<boolean>()
    const [formValue, setFormValue] = React.useState<Post>({} as Post)
    const [isEdit, setIsEdit] = React.useState<boolean>(false)

    const services = {
        postService: new PostService(),
        timeHelper: new TimeHelper()
    }

    const columnsDefined = [{
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Title',
        accessor: 'title',
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
    {
        Header: 'Created Date',
        accessor: 'createdDate',
    },
    {
        Header: 'Last Modifier Date',
        accessor: 'lastModifier',
    },
    {
        Header: 'Author',
        accessor: 'author',
    },
    {
        Header: 'Action',

        Cell: (value: any) => (
            <div>
                <button className="buttonAct" onClick={onEdit(value.row.original)}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="buttonAct" onClick={() => { }}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        )
    }]

    useEffect(() => {
        fetchPostsData() 
    }, [])
    const showModal = () => setShow(true)
    const closeModal = () => setShow(false)

    const onEdit = (value: any) => () => {
        setIsEdit(true)
        console.log(isEdit);
        
        setFormValue(value)
        showModal()
    }

    const onSubmit = (e: any) => {
        const postSubmitObj = {
            id: formValue.id,
            urlTitle: "",
            author: {
                id: formValue.author.id
            },
            imageUrl: formValue.imageUrl,
            postRead: formValue.postRead,
            title: e.target[0].value,
            description: e.target[1].value,
            content:""

        }
        const update = services.postService.updatePost(postSubmitObj).then(() => updateTable())
        
        toast.promise(update, {
            pending: "Promise is pending",
            success: "Update success",
            error: "Something went wrong 🤯 "
        });

    }

    const fetchPostsData = () => {
        services.postService.getAll().then((res) => {
            setPosts(services.postService.prepareDataForTable(res))
          })
    }
    const updateTable = () => {
        fetchPostsData()
        closeModal()
    }

    // const myPromise = new Promise((resolve) => () =>
    //     fetch("https://jsonplaceholder.typicode.com/post")
    //       .then((response) => response.json())
    //       .then((json) => setTimeout(() => resolve(json), 3000))
    //   );
    //     const notifyToast = () => {


    //     }


    return (
        <>
            <div id="layoutSidenav_content">
                <main>
                    <HeaderContent icon={faFileLines} title="Posts" description="123" />
                    <div className="container-xl px-4">
                        <div className="card mb-4">
                            <div className="card-header">Post Data Control Table</div>
                            <div className="card-body">
                                <DataTable datas={posts} columnsDefine={columnsDefined} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
                dialogClassName="modal-90w"
            >
                {/* Modal area */}
                <Modal.Header closeButton>
                    <Modal.Title>{(isEdit ? "Edit post": "Add new post")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit} id="postForm">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={15} defaultValue={formValue.description} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button type="submit" form="postForm" variant="primary">Save</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    );
}

export default ListsPostPage;