import { FunctionComponent, useState, useEffect, Fragment } from "react";
import { TimeHelper } from "../../helper/TimeHelper";
import PostService from "../../services/PostService";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toast } from "react-toastify";
import { Button } from 'primereact/button';
import { Post } from "../../interface/Post.object";
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import TinyMce from "../editor/Tiny.mce";
import { PostTag } from "../../interface/Tag.object";
import axios from "axios";
import { User } from "../../interface/User.object";
import SpinnerLoading from "../spinner/SpinnerLoading";
import { Controller, FieldErrorsImpl, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";

interface PostTableProps {

}



const PostTable: FunctionComponent<PostTableProps> = () => {
    const defaultValues: Post = {
        id: null,
        title: '',
        thumbnailUrl: '',
        description: '',
        content: '',
        tags: [],
    }
    // const defaultValues = {
    //     name: '',
    //     email: '',
    //     password: '',
    // }

    const { control, setValue, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const [posts, setPosts] = useState<any[]>([])
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [tags, setTags] = useState<PostTag[]>([])
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postId, setPostId] = useState<number>()

    const services = {
        postService: new PostService(),
        timeHelper: new TimeHelper()
    }


    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/tag/tags').then((response) => setTags(response.data))
        fetchPostsData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChangeContentStage = (newContentState: string) => {
        // setContent(newContentState);
        setValue('content', newContentState)

    };

    const fetchPostsData = () => {
        services.postService.getAll().then((res) => {
            setPosts(services.postService.convert(res))
        }).catch((err) => {
            toast.error(`Something went wrong 🤯, err: ${err}`)
        })
    }

    const updateTable = () => {
        fetchPostsData()
        setShowDialog(false)
        setShowConfirm(false)
    }

    const actionBodyTemplate = (rowData: any) => {
        return (
            <Fragment>
                <Button icon="pi pi-pencil" className="p-button-text" onClick={() => onUpdate(rowData)} />
                <Button icon="pi pi-trash" className="p-button-text" onClick={() => onDelete(rowData)} />
            </Fragment>
        );
    }

    const onUpdate = (rowData: any) => {
        setValue('title', rowData.title)
        setValue('description', rowData.description)
        setValue('thumbnailUrl', rowData.thumbnailUrl)
        setValue('tags', rowData.tags)
        setValue('content', rowData.content)
        setValue('id', rowData.id)
        setIsEdit(true)
        setShowDialog(true)
    }

    
    const onDelete = (rowData: any) => {
        setPostId(rowData.id)
        setShowConfirm(true);
    }

    const deletePost = () => {
        const deleteAct = services.postService.deletePost(postId).then(() => updateTable())
        triggerToastPromise(deleteAct, 'Deleting')
    }

    const onSubmit = (data: any) => {
        const author: User = { id: 1 };
        const postRequest: Post = data;
        postRequest.author = author;
        isEdit ? update(postRequest) : create(postRequest)
    };



    const update = (postRequest: Post) => {
        const update = services.postService.updatePost(postRequest).then(() => updateTable())
        triggerToastPromise(update, 'Updating')
    }

    const create = (postRequest: Post) => {
        const create = services.postService.createPost(postRequest).then(() => updateTable())
        triggerToastPromise(create, 'Creating')
    }

    const onHide = () => {
        setShowDialog(false);
    }

    const onAdd = () => {
        reset()
        setIsEdit(false)
        setShowDialog(true);
    }

    const triggerToastPromise = (promiseFunc: any, action: string) => {
        toast.promise(promiseFunc, {
            pending: `${action} ...please wait ...`,
            success: `${action} success`,
            error: {
                render({ data }) {
                    // When the promise reject, data will contains the error
                    return `${data} 🤯`
                }
            }
        });
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="Close" icon="pi pi-times" onClick={onHide} className="p-button-text" />
                <Button label="Confirm" icon="pi pi-check" type="submit" form="postForm" autoFocus />
            </div>
        );
    }
    const createdDateFormat = (rowData: any, column: any) => {
        return rowData['createdDate'] ? services.timeHelper.convertHumanTime(rowData['createdDate']) : "";
    }
    const lastModifierFormat = (rowData: any, column: any) => {
        return rowData['lastModifier'] ? services.timeHelper.convertHumanTime(rowData['lastModifier']) : "";
    }


    return (
        <>
            <div className="grid">
                <div className="field col-12 md:col-4">
                    <Button label="Add new" icon="pi pi-plus" onClick={onAdd} className="p-button-text" />
                </div>
            </div>

            <DataTable value={posts} responsiveLayout="scroll">
                <Column style={{ width: '5%' }} field="id" header="ID" />
                <Column field="title" header="Title" />
                <Column field="createdDate" body={createdDateFormat} header="Created Date" />
                <Column field="lastModifier" body={lastModifierFormat} header="Last Modifier" />
                <Column field="author" header="Author" />
                <Column header="Action" body={actionBodyTemplate} />
            </DataTable>




            <Dialog header={(isEdit ? "Update" : "Add new")} visible={showDialog} style={{ width: '90vw' }} footer={renderFooter} onHide={() => setShowDialog(false)}>
                <div>
                    <form id="postForm" onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="grid p-fluid">
                            <div className="field col-8 md:col-4 my-4">
                                <span className="p-float-label">
                                    <Controller name="title" control={control} rules={{ required: 'Title is required.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.error })} />
                                    )} />
                                    {errors?.title && <small className="p-error">{errors.title.message}</small>}
                                    {/* <InputText id="title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} /> */}
                                    <label htmlFor="title" className={classNames({ 'p-error': !!errors.title })}>Title*</label>
                                </span>
                            </div>
                            <div className="field col-8 md:col-4 my-4">
                                <span className="p-float-label">
                                    <Controller name="description" control={control} rules={{ required: 'Description is required.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.error })} />
                                    )} />
                                    {errors?.description && <small className="p-error" >{errors.description.message}</small>}
                                    {/* <InputText id="description" value={post.description} onChange={(e) => setPost({ ...post, description: e.target.value })} /> */}
                                    <label htmlFor="description" className={classNames({ 'p-error': !!errors.description })}>Description*</label>
                                </span>
                            </div>
                            <div className="field col-8 md:col-4 my-4">
                                <span className="p-float-label">
                                    <Controller name="thumbnailUrl" control={control} rules={{ required: 'Thumbnail url is required.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.error })} />
                                    )} />
                                    {errors?.thumbnailUrl && <small className="p-error">{errors.thumbnailUrl.message}</small>}
                                    {/* <InputText id="thumbnailUrl" value={post.thumbnailUrl} onChange={(e) => setPost({ ...post, thumbnailUrl: e.target.value })} /> */}
                                    <label htmlFor="thumbnailUrl" className={classNames({ 'p-error': !!errors.thumbnailUrl })}>Thumbnail Url*</label>
                                </span>
                            </div>
                            <div className="field col-12 md:col-4 my-4">
                                <span className="p-float-label">
                                    <Controller name="tags" control={control} rules={{ required: 'Tags is required.' }} render={({ field, fieldState }) => (
                                        <MultiSelect
                                            filter={true}
                                            resetFilterOnHide={true}
                                            className={classNames({ 'p-invalid': fieldState.error })}
                                            display="chip"
                                            optionLabel="tagName"
                                            options={tags}
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.value)} />
                                    )} />
                                    {errors?.tags && <small className="p-error">{errors.tags.message}</small>}

                                    <label htmlFor="tags" className={classNames({ 'p-error': !!errors.tags })}>Tags*</label>
                                </span>
                            </div>
                            <div className="field col-12 md:col-4 my-4">
                                <label htmlFor="content" className={classNames({ 'p-error': !!errors.content })} >Content*</label>
                                {errors?.content && <small className="p-error">{errors.content.message}</small>}
                                <Controller name="content" control={control} rules={{ required: ' is required.' }} render={({ field }) => (
                                    <TinyMce initialValue={field.value || ''} handleEditorChange={onChangeContentStage}></TinyMce>
                                )} />

                            </div>
                        </div>
                    </form>
                </div>
            </Dialog>
            <ConfirmDialog visible={showConfirm} onHide={() => setShowConfirm(false)} message="Are you sure you want to delete"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={deletePost} reject={() => setShowConfirm(false)} />

            <SpinnerLoading isLoading={isLoading} />
        </>
    );
}

export default PostTable;