import { useRef } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

function RichText({ defaultContent, onSave, onChange, onBlur }) {
    const editor = useRef();

    const handleOnSave = () => {
        if (onSave) {
            onSave(editor);
        }
    };
    const handleOnChange = () => {
        if (onChange) {
            onChange(editor);
        }
    };
    const handleOnBlur = () => {
        if (onBlur) {
            onBlur(editor);
        }
    };

    return (
        <div>
            <SunEditor
                setOptions={{
                    buttonList: [
                        ['font', 'fontSize', 'formatBlock'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['align', 'horizontalRule', 'list', 'table'],
                        ['fontColor', 'hiliteColor'],
                        ['outdent', 'indent'],
                        ['undo', 'redo'],
                        ['removeFormat'],
                        ['outdent', 'indent'],
                        ['link', 'image'],
                        ['preview', 'print'],
                        ['fullScreen', 'showBlocks', 'codeView'],
                    ],
                }}
                setDefaultStyle="font-size: 20px;text-align:left;height:30vh"
                setContents={defaultContent}
                getSunEditorInstance={(sunEditor) => (editor.current = sunEditor)}
                onSave={handleOnSave}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
            />
        </div>
    );
}

export default RichText;
