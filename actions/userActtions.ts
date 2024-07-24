'use server'


import {db} from "@/db";
import {pack, pack_video, videos} from "@/db/schema";
import {revalidatePath} from "next/cache";
import {eq} from "drizzle-orm";
import {createClient} from "@/utils/supabase/server";
import {supabase} from "@/utils/supabase/supabase";
import {integer, serial, text} from "drizzle-orm/pg-core";


interface video{
    user_id: string  ,
    // thumbnail: string | null  ,
    description: string | null  ,
    videoTitle: string   ,
    videoSrc: string  ,
    // packId: number | null,
}

interface packVideo{
    videoTitle:string,
    description:string,
    videoSrc:string,
    packId:number,
}


//ブロブ用に残しておく
export const uploadVideo=async (formData:FormData)=>{
    try{
        console.log('jikko')
        const supabase=createClient()
        const {data}=await supabase.auth.getUser()
       const userId=data.user?.id
        console.log(userId)
        if(!userId){
            return ;
        }
        // if(!event.target.files || event.target.files.length===0){
        //     throw new Error("You must select a file to upload")
        // }

        const file=formData.get("file") as any

        console.log(file)
        // const filePath=file.name
        const fileName=file.name.split('.').shift()
        const fileExt=file.name.split('.').pop()
        const filePath=`${fileName}-${userId}-${Math.random()}.${fileExt}`
        // const filePath=`${userId}-${Math.random()}.${fileExt}`
        console.log(filePath)
        const {error:uploadError}=await supabase.storage.from("video").upload(filePath,file)

        const video={
            videoTitle:formData.get("videoTitle") as string,
            description:formData.get("description") as string,
            videoSrc:filePath,
            user_id:userId
        }
        // console.log(file)
        if(uploadError){
            throw uploadError
        }
        else {
           await postVideo(video)
            console.log("アップロード完了")
           //window.alert("アップロード完了")

        }
        // userIdとpathをdatabaseにわたす。watchで取得して、userIdのpathだけとる

    }catch (error){
        console.log('Error uploading video!')
        //window.alert('Error uploading video!')
    }
}

export const postVideo=async (video:video)=>{

    await db.insert(videos).values({
        videoTitle: video.videoTitle,
        videoSrc:video.videoSrc,
        description: video.description,
        user_id: video.user_id
    })

    revalidatePath('/','layout');

}

export const postPackVideo=async (packVideo:packVideo)=>{
    await db.insert(pack_video).values({
        videoTitle:packVideo.videoTitle,
        description:packVideo.description,
        videoSrc: packVideo.videoSrc,
        packId: packVideo.packId
    })

    revalidatePath("/","layout")
}
export const deleteVideo=async(path:string)=>{
    await db.delete(videos).where(eq(videos.videoSrc,path))

    revalidatePath('/','layout')
}
// await db.insert(videos).values({
//     videoTitle: videoInformation.videoTitle,
//     videoSrc: filePath,
//     description: videoInformation.description,
//     user_id: userId
// })
export const create=async()=>{

}

interface packInfos{
    packTitle:string,
    description:string,
    thumbnail:File,
    userId:string
}

export const createPackFront=async (packInfo:packInfos)=>{
    console.log("packInfo")
    console.log("hello")
    const file=packInfo.thumbnail
    const fileName=file.name.split('.').shift();
    const fileExt=file.name.split('.').pop();
    const filePath=`${fileName}-${Math.random()}.${fileExt}`;

    const {error:uploadError}=await supabase.storage.from("thumbnail").upload(filePath,file)

    await db.insert(pack).values({
        PackTitle:packInfo.packTitle,
        description: packInfo.description,
        thumbnail: filePath,
        userId: packInfo.userId
    })
    if(uploadError){
        throw uploadError
    }
    //thumbnailをuploadする処理

}
interface packFront{
    packTitle:string,
    description:string,
    thumbnail:string,
    userId:string
}
export const postPackFront=async(packInfo:packFront)=>{
    await db.insert(pack).values({
        PackTitle:packInfo.packTitle,
        description: packInfo.description,
        thumbnail: packInfo.thumbnail,
        userId: packInfo.userId
    })
}

interface packVideoInfo{
    videoTitle:string,
    description:string,
    file:File,
    packId:number
}

export const postToBacket=async(packVideoInfo:packVideoInfo)=>{
    const file=packVideoInfo.file
    const fileName=file.name.split('.').shift();
    const fileExt=file.name.split('.').pop();
    const filePath=`${fileName}-${Math.random()}.${fileExt}`;
    const {error:uploadError}=await supabase.storage.from("packVideo").upload(filePath,file)

    if (uploadError){
        throw uploadError
    }else {
        await db.insert(pack_video).values({
            videoTitle:packVideoInfo.videoTitle,
            description:packVideoInfo.description,
            videoSrc: filePath,
            packId: packVideoInfo.packId
        })

    }
}
interface packVideoInfos{
    videoTitle:string,
    description:string,
    file:string,
    packId:number
}
export const postPackEachVideo=async (packVideoInfo:packVideoInfos)=>{
    await db.insert(pack_video).values({
        videoTitle:packVideoInfo.videoTitle,
        description:packVideoInfo.description,
        videoSrc: packVideoInfo.file,
        packId: packVideoInfo.packId
    })
}
interface supabasePackVideoBacket{
    file:File,
    filePath:string
}
export const supabaseBacketUpload=async ({file,filePath}:supabasePackVideoBacket)=>{
    const {error:uploadError}=await supabase.storage.from("packVideo").upload(filePath,file)
    if(uploadError){
        throw uploadError
    }
}

export const userActionTest=async (comment:string)=>{
    console.log(comment)
}
