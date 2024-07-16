'use client'
import React, {useState, useTransition} from 'react';
import {supabase} from "@/utils/supabase/supabase";
import {revalidatePath} from "next/cache";
import {db} from "@/db";
import {videos} from "@/db/schema";
import {postVideo} from "@/actions/userActtions";



type Props={
    userId:string
}
const UploadPage = ({userId}:Props) => {
    const [selectedFile, setSelectedFile] = useState<any>();
    const [uploading, setUploading] = useState(false)
    const [videoInformation, setVideoInformation] = useState<{videoTitle:string,description:string}>({videoTitle:"",description:""})

    const uploadChange=async ()=>{
        try{
            setUploading(true)

            // if(!event.target.files || event.target.files.length===0){
            //     throw new Error("You must select a file to upload")
            // }
            if(!selectedFile){
                throw new Error("You must select a file to upload")
            }

            const file=selectedFile

            console.log(file)
            // const filePath=file.name
            const fileName=file.name.split('.').shift()
            const fileExt=file.name.split('.').pop()
            const filePath=`${fileName}-${userId}-${Math.random()}.${fileExt}`
            // const filePath=`${userId}-${Math.random()}.${fileExt}`
            console.log(filePath)
            const {error:uploadError}=await supabase.storage.from("video").upload(filePath,file)

            const video={
                videoTitle:videoInformation.videoTitle,
                description:videoInformation.description,
                videoSrc:filePath,
                user_id:userId
            }


            // console.log(file)
            if(uploadError){
                throw uploadError
            }
            else {
               postVideo(video)
                alert("アップロード完了")
                setVideoInformation({videoTitle:"",description:""})
            }
            // userIdとpathをdatabaseにわたす。watchで取得して、userIdのpathだけとる

        }catch (error){
            alert('Error uploading video!')
        }finally {
            setUploading(false)
        }
    }

    return (
        <>
            <h1>PostVideo</h1>
            <form className={"flex flex-col"}>
                <input placeholder={"videoTitle"} onChange={(e)=>setVideoInformation({...videoInformation,videoTitle: e.target.value})} value={videoInformation.videoTitle} name={""} className={"border-black border-2"} type={"text"}/>
                {/*<input placeholder={"thumbnail"} name={""} className={"border-black border-2"} type="text"/>*/}
                {/*<input placeholder={""} name={""} className={"border-black border-2"} type="text"/>*/}
                <input placeholder={"description"} onChange={(e)=>setVideoInformation({...videoInformation,description: e.target.value})} value={videoInformation.description} name={""} className={"border-black border-2"} type="text"/>
                {/*<input placeholder={"packId"} name={""} className={"border-black border-2"} type="text"/>*/}
                <input  name={""} id={"file"} onChange={(e:any)=>setSelectedFile(e?.target?.files?.[0])} className={"border-black border-2"} accept={"video/mp4"} disabled={uploading}  type="file"/>
                <p>ファイル名にローマ数字(Ⅰ,Ⅱ,Ⅲなど)などの機種依存文字が含まれる場合はアップロードできません</p>
                <button onClick={uploadChange} type={"button"}>upload</button>
            </form>
        </>
    );
};

export default UploadPage;