import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
interface TinyMceProps {
    initialValue: string
    handleEditorChange: Function
    
}

const TinyMce: FunctionComponent<TinyMceProps> = (props, prevProps) => {
    const [value, setValue] = useState<string>('')
    const editorRef = useRef(null as any);
    const onChange = (content: any) => {
        setValue(content)
        props.handleEditorChange(content)

    }
    useEffect(() => {
        if (props.initialValue !== prevProps.initialValue) {
            setValue(props.initialValue ?? '')
        }
        const handler = (e: any) => {
            if (e.target.closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root") !== null) {
              e.stopImmediatePropagation();
            }
          };
          document.addEventListener("focusin", handler);
          return () => document.removeEventListener("focusin", handler);
    }, [])

    const imageCallBack = (cb: any, value: any, meta: any) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.addEventListener('change', (e: any) => {
            const file = e.target.files[0];

            const reader: any = new FileReader();
            reader.addEventListener('load', () => {
                /*
                  Note: Now we need to register the blob in TinyMCEs image blob
                  registry. In the next release this part hopefully won't be
                  necessary, as we are looking to handle it internally.
                */
                const id = 'blobid' + (new Date()).getTime();
       
                const blobCache = editorRef.current.editorUpload.blobCache;
                const base64 = reader.result.split(',')[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name });
            });
            reader.readAsDataURL(file);
        });

        input.click();
    }

    return (
        <Editor
            onInit={(evt, editor) => {
                    editorRef.current = editor    
            }}
            init={{
                height: 700,
                codesample_global_prismjs: true,
                plugins: [
                    'lists',
                    'link',
                    'image',
                    'preview',
                    'help',
                    'wordcount',
                    'codesample',
                ],
                toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help | codesample image preview',
                a11y_advanced_options: true,
                file_picker_types: 'file image media',
                file_picker_callback: imageCallBack
            }}
            apiKey="vnif7wzcxggq4boohbrbnvwee92j8gyoxvtvdvt4p5ponz33"
            value={value}
            onEditorChange={onChange}
        />
    );
}

export default TinyMce;