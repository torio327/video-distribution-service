import React from 'react';
import {Button} from "@/components/ui/button";

type Props={
    onVideoTitleChange:(value:string)=>void;
    onVideoDescriptionChange:(value:string)=>void;
    onVideoFileChange:(file:File)=>void;
    videoTitleValue:string,
    videoDescriptionValue:string,
    addFile:()=>void
}
const PackContent = ({onVideoTitleChange,onVideoDescriptionChange,onVideoFileChange,videoTitleValue,videoDescriptionValue,addFile}:Props) => {
    const handleVideoTitleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        onVideoTitleChange(event.target.value)
    }
    const handleVideoDescriptionChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        onVideoDescriptionChange(event.target.value)
    }
    const handleVideoFileChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const file=event.target.files?.[0]
        if(file){
            onVideoFileChange(file)
        }

    }

    return (
            <div className={"border-blue-500 border-2"}>
                <input placeholder={"videoTitle"}
                       className={"border-black border-2"}
                       onChange={handleVideoTitleChange}
                       type={"text"} value={videoTitleValue}/>
                <input placeholder={"description"}
                       name={""} className={"border-black border-2"}
                       onChange={handleVideoDescriptionChange}
                       type="text" value={videoDescriptionValue}/>
                <input type={"file"} onChange={handleVideoFileChange}
                       accept={"video/mp4"}/>
                <Button onClick={addFile} className={"w-10"} variant={"secondary"}>Add</Button>
            </div>
    );
};

export default PackContent;