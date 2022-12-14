import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { Dispatch, SetStateAction } from "react";

type TinyEditorProps = {
    name: string;
    set: Dispatch<SetStateAction<string>>;
};

export default ({ name, set }: TinyEditorProps) => {
    const editorRef = useRef<any>();
    const recieverName = name;
    return (
        <>
            <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={
                    recieverName ? `<p>O ${recieverName} é muito...</p}>` : ""
                }
                apiKey={"n69cptqbjgd6ay1e5pseo0q8a4wvm3xaitghsesp686qdblq"}
                onChange={(e) => set(editorRef.current.getContent())}
                disabled={!name ? true : false}
                init={{
                    height: 500,
                    menubar: false,
                    language: "pt_BR",
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                        "emoticons",
                    ],
                    toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist | " +
                        "removeformat | emoticons",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            />
        </>
    );
};
