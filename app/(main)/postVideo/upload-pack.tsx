import React, {useState} from 'react';
import PackHeader from "@/app/(main)/postVideo/pack-header";
import PackContent from "@/app/(main)/postVideo/pack-content";
import UploadPackButton from "@/app/(main)/postVideo/upload-pack-button";
type Props={
    userId:string
}

const UploadPack = ({userId}:Props) => {
    const [packInfo, setPackInfo] = useState<{packTitle:string,description:string,thumbnail:any}>({packTitle:"",description:"",thumbnail:undefined})
    const [videos, setVideos] = useState<{videoTitle:string,description:string,file:File}[]>([])
    const [videoInfo, setVideoInfo] = useState<{videoTitle:string,description:string,file:any}>({videoTitle:"",description:"",file:undefined})
    const [files,setFiles] = useState<File[]>([])

    const addFile=()=>{
        if(videoInfo.videoTitle===""||videoInfo.file===undefined||videoInfo.description===""){
            return ;
        }else{
            videos.push(videoInfo)
            files.push(videoInfo.file)
            setVideoInfo({videoTitle:"",description:"",file:undefined})
        }

    }

    const handleChange=(setter:React.Dispatch<React.SetStateAction<any>>,field:string)=>(newValue:string|File)=>{
        setter((prevState:any)=>({...prevState,[field]:newValue}))
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

            <div>
                <UploadPackButton files={files} videos={videos} packInfo={packInfo} userId={userId} />
            </div>

        </>
    );
};
//onChange={(e: any) => setSelectedFile(e?.target?.files?.[0])}
export default UploadPack;