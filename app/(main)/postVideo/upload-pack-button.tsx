import React from 'react';
import {Button} from "@/components/ui/button";

type Props={
    files:File[],
    videos:{videoTitle:string,description:string,file:File}[],
    packInfo:{packTitle:"",description:""}
}
const UploadPackButton = ({files,videos,packInfo}:Props) => {
    const createPack=()=>{
        // if(files.length===0||videos.length||packInfo.packTitle===""||packInfo.description===""){
        //     return ;
        // }
        if(!files.length||!videos.length||!packInfo.packTitle||!packInfo.description){
            return ;
        }
    }
    return (
        <>
            <Button variant={"default"} onClick={createPack}>Create Pack</Button>
        </>
    );
};

export default UploadPackButton;