import React, {useState} from 'react';

const UploadPack = () => {
    const [files, setFiles] = useState<{videoTitle:string,description:string}[]>([{videoTitle:"",description:""}])
    const [file, setFile] = useState([])
    const addFile=()=>{

    }
    return (
        <>
            <form action="" className="flex flex-col">
                <input className={"border-black border-2"} placeholder={"packTitle"} name={"packTitle"} type="text"/>
                <input className={"border-black border-2"} placeholder={"description"} name={"description"} type={"text"}/>
                <div className={"border-blue-500 border-2"}>
                                <input placeholder={"videoTitle"}
                                        className={"border-black border-2"}
                                       type={"text"}/>
                                <input placeholder={"description"}
                                        name={""} className={"border-black border-2"}
                                       type="text"/>
                    <input type={"file"}/>
                </div>

                {/*{files.map((file)=>{*/}
                {/*    return(*/}
                {/*        <>*/}
                {/*            <input placeholder={"videoTitle"}*/}
                {/*                    className={"border-black border-2"}*/}
                {/*                   type={"text"}/>*/}
                {/*            <input placeholder={"description"}*/}
                {/*                    name={""} className={"border-black border-2"}*/}
                {/*                   type="text"/>*/}
                {/*        </>*/}
                {/*    )*/}
                {/*})}*/}
            </form>


        </>
    );
};

export default UploadPack;