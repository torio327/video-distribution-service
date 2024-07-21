import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import PackHeader from "@/app/(main)/postVideo/pack-header";
import PackContent from "@/app/(main)/postVideo/pack-content";


const UploadPack = () => {
    const [packInfo, setPackInfo] = useState({packTitle:"",description:"",thumbnail:File})
    const [videos, setVideos] = useState<{videoTitle:string,description:string,file:File}[]>([])
    const [videoInfo, setVideoInfo] = useState<{videoTitle:string,description:string,file:File}>({videoTitle:"",description:"",file:null})
    const [files,setFiles] = useState<File[]>([])

    const addFile=()=>{
        if(videoInfo.videoTitle===""||videoInfo.file===null){
            return ;
        }
      videos.push(videoInfo)
        files.push(videoInfo.file)
        setVideoInfo({videoTitle:"",description:"",file:null})
    }

    const handleChange=(setter:React.Dispatch<React.SetStateAction<any>>,field:string)=>(newValue:string|File)=>{
        setter(prevState =>({...prevState,[field]:newValue}))
    }

    console.log("hello")
    return (
        <>
            <form action="" className="flex flex-col">
                <div>
                    <PackHeader onPackTitleChange={handleChange(setPackInfo,'packTitle')} onDescriptionChange={handleChange(setPackInfo,'description')} onThumbnailChange={handleChange(setPackInfo,'thumbnail')}/>
                </div>
                {videos.map((video,index:number)=>{
                    return(
                        <div key={index} className={"border-blue-500 border-2"}>
                            <p><span className={"mr-6"}>videoTitle:</span> {video.videoTitle}</p>
                            <p><span className={"mr-6"}>description:</span>{video.description}</p>
                            <p><span className={"mr-6"}>fileName:</span>{video.file.name}</p>
                        </div>
                    )
                })}
            </form>
            <PackContent onVideoTitleChange={handleChange(setVideoInfo,"videoTitle")} onVideoDescriptionChange={handleChange(setVideoInfo,"description")} onVideoFileChange={handleChange(setVideoInfo,"file")} videoTitleValue={videoInfo.videoTitle} videoDescriptionValue={videoInfo.description} addFile={addFile}/>
        </>
    );
};
//onChange={(e: any) => setSelectedFile(e?.target?.files?.[0])}
export default UploadPack;