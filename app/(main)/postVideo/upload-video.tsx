import React, {useState} from 'react';
import UploadButton from "@/app/(main)/postVideo/upload-button";
import {supabase} from "@/utils/supabase/supabase";
import {postVideo} from "@/actions/userActtions";
import {cn} from "@/lib/utils";
import LoadingDialog from "@/components/loading-dialog";

type Props={
    userId:string,

}

const UploadVideo = ({userId}:Props) => {
    const [selectedFile, setSelectedFile] = useState<any>();
    const [uploading, setUploading] = useState(false)
    const [videoInformation, setVideoInformation] = useState<{videoTitle:string,description:string}>({videoTitle:"",description:""})

    const uploadChange=async ()=>{
        try{
            setUploading(true)
            if(!selectedFile){
                throw new Error("You must select a file to upload")
            }
            const file=selectedFile

            const fileName=file.name.split('.').shift()
            const fileExt=file.name.split('.').pop()
            const filePath=`${fileName}-${userId}-${Math.random()}.${fileExt}`

            const {error:uploadError}=await supabase.storage.from("video").upload(filePath,file)
            const video={
                videoTitle:videoInformation.videoTitle,
                description:videoInformation.description,
                videoSrc:filePath,
                user_id:userId
            }

            if(uploadError){
                throw uploadError
            }
            else {
                postVideo(video)
                alert("アップロード完了")
                setVideoInformation({videoTitle:"",description:""})
            }

        }catch (error){
            alert('Error uploading video!')
        }finally {
            setUploading(false)
        }
    }
    return (
        <>
            <form className={cn("flex flex-col",
                uploading&&"pointer-events-none opacity-50"
            )}>
                <input placeholder={"videoTitle"}
                       onChange={(e) => setVideoInformation({...videoInformation, videoTitle: e.target.value})}
                       value={videoInformation.videoTitle} name={""} className={"border-black border-2"} type={"text"}/>
                {/*<input placeholder={"thumbnail"} name={""} className={"border-black border-2"} type="text"/>*/}
                {/*<input placeholder={""} name={""} className={"border-black border-2"} type="text"/>*/}
                <input placeholder={"description"}
                       onChange={(e) => setVideoInformation({...videoInformation, description: e.target.value})}
                       value={videoInformation.description} name={""} className={"border-black border-2"} type="text"/>
                {/*<input placeholder={"packId"} name={""} className={"border-black border-2"} type="text"/>*/}
                <input name={""} id={"file"} onChange={(e: any) => setSelectedFile(e?.target?.files?.[0])}
                       className={"border-black border-2"} accept={"video/mp4"} disabled={uploading} type="file"/>
                <p>ファイル名にローマ数字(Ⅰ,Ⅱ,Ⅲなど)などの機種依存文字が含まれる場合はアップロードできません</p>
                <UploadButton upload={uploadChange}/>
            </form>
            {uploading&&(
                <><LoadingDialog/></>
            )}
        </>
    );
};

export default UploadVideo;