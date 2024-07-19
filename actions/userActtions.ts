'use server'


import {db} from "@/db";
import {videos} from "@/db/schema";
import {revalidatePath} from "next/cache";
import {eq} from "drizzle-orm";
import {createClient} from "@/utils/supabase/server";
import {supabase} from "@/utils/supabase/supabase";


interface video{
    user_id: string  ,
    // thumbnail: string | null  ,
    description: string | null  ,
    videoTitle: string   ,
    videoSrc: string  ,
    // packId: number | null,
}

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
    // const gvideos=await getVideo();

    await db.insert(videos).values({
        videoTitle: video.videoTitle,
        videoSrc:video.videoSrc,
        description: video.description,
        user_id: video.user_id
    })

    revalidatePath('/','layout');

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