import { FunctionComponent } from "react";
import { faFileLines, faEdit, faTrash, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import HeaderContent from "../components/HeaderContent";
import { Post } from "../interface/Post.object";
import PostService from "../services/PostService";
import { TimeHelper } from "../helper/TimeHelper";
import DataTable from "../components/DataTable";

import 'react-toastify/dist/ReactToastify.css';
import SpinnerLoading from "../components/spinner/SpinnerLoading";


interface ListsPostPageProps {

}



const ListsPostPage: FunctionComponent<ListsPostPageProps> = () => {
    const [posts, setPosts] = React.useState<Post[]>([])
    const [show, setShow] = React.useState<boolean>()
    const [formValue, setFormValue] = React.useState<Post>({} as Post)
    const [isEdit, setIsEdit] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isDelete, setIsDelete] = React.useState<boolean>(false)

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
                <button className="buttonAct" onClick={onDelete(value.row.original)}>
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
    const showDeleteModal = () => setIsDelete(true)
    const closeDeleteModal = () => setIsDelete(false)

    const onEdit = (value: any) => () => {
        setIsEdit(true)
        setFormValue(value)
        showModal()
    }

    const onDelete = (value: any) => () => {
        setFormValue(value)
        setIsDelete(true)
        showDeleteModal()
    }

    const onAdd = () => {
        setFormValue({} as Post)
        setIsEdit(false)
        showModal()
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (isEdit) {
            const postNeedUpdate = {
                id: formValue.id,
                urlTitle: "",
                author: {
                    id: formValue.author.id
                },
                imageUrl: formValue.imageUrl,
                postRead: formValue.postRead,
                title: e.target[0].value,
                description: e.target[1].value,
                content: e.target[2].value,
            }
            updatePost(postNeedUpdate)
        } else {
            const postCreating = {
                urlTitle: "",
                author: {
                    id: 1
                },
                imageUrl: '',
                postRead: '',
                title: e.target[0].value,
                description: e.target[1].value,
                content: e.target[2].value
            }
            addPost(postCreating)
        }
    }

    const updatePost = (postSubmitObj: any) => {
        const update = services.postService.updatePost(postSubmitObj).then(() => updateTable())
        triggerToastPromise(update, 'Updating')
    }

    const addPost = (postSubmitObj: any) => {
        const create = services.postService.createPost(postSubmitObj).then(() => updateTable())
        triggerToastPromise(create, 'Creating')
    }

    const confrimDeletePost = () => {
        const deletePromise = services.postService.deletePost(formValue.id).then(() => {updateTable()})
        triggerToastPromise(deletePromise, 'Deleting')
    }

    const triggerToastPromise = (promiseFunc: any, action: string) => {
        toast.promise(promiseFunc, {
            pending: `${action} ...please wait ...`,
            success: `${action} success`,
            error: "Something went wrong 🤯 "
        });
    }

    const fetchPostsData = () => {
        setIsLoading(true)
        services.postService.getAll().then((res) => {
            setPosts(services.postService.prepareDataForTable(res))
            setIsLoading(false)
        }).catch((err) => {
            toast.error("Something went wrong 🤯, data not loading")
            setIsLoading(false)
        })
    }
    const updateTable = () => {
        fetchPostsData()
        closeModal()
        closeDeleteModal()
    }

    return (
        <>
            <div id="layoutSidenav_content">
                <main>
                    <HeaderContent icon={faFileLines} title="Posts" description="123" />
                    <div className="container-xl px-4">
                        <div className="card mb-4 d-grid">
                            <div className="card-header">
                                <Row className="justify-content-md-center">
                                    <Col xs lg="10">
                                        <p>Post Data Control Table</p>
                                    </Col>
                                    <Col xs lg="2">
                                        <Button className="float-end" onClick={onAdd}>
                                            New post <FontAwesomeIcon icon={faPlusCircle} />
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                            <div className="card-body">
                                <DataTable datas={posts} columnsDefine={columnsDefined} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* Modal area */}
            <Modal

                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{(isEdit ? "Edit post" : "Add new post")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit} id="postForm">
                        <Form.Group className="mb-3" controlId="postForm.title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="title .."
                                defaultValue={formValue.title}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postForm.description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description .."
                                autoFocus
                                defaultValue={formValue.description}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.content"
                        >
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={15} defaultValue={formValue.content} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button form="postForm" variant="primary" type="submit">Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal confirm delete area */}
            <Modal show={isDelete} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>Wow, you're deleting post ID <b style={{color:"red"}}>{formValue.id}</b>, are you sure for that? This action can't reverse</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={confrimDeletePost}>
                       I confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
            <SpinnerLoading isLoading={isLoading} />
        </>
    );
}

export default ListsPostPage;