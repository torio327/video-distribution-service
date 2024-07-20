import {useActionState} from 'react';

import {uploadVideo} from "@/actions/userActtions";



const TestUpload = () => {
    //test
    // const [message,uploadAction]=useActionState(uploadVideo,null)
    return (
        <div>
            <h1>TestUpload</h1>
            <form className={"flex flex-col"} action={uploadVideo} >
                <input id={"videoTitle"} name={"videoTitle"} placeholder={"videoTitle"}
                        className={"border-black border-2"} type={"text"}/>

                <input id={"description"} name={"description"} placeholder={"description"}
                        className={"border-black border-2"} type="text"/>

                <input id={"file"}  name={"file"}
                       className={"border-black border-2"} accept={"video/mp4"} type="file"/>
                <p>ファイル名にローマ数字(Ⅰ,Ⅱ,Ⅲなど)などの機種依存文字が含まれる場合はアップロードできません</p>
                <button type={"submit"}  >upload</button>
            </form>
        </div>
    );
};

export default TestUpload;