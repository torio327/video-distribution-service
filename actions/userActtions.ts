'use server'


import {db} from "@/db";
import {videos} from "@/db/schema";
import {revalidatePath} from "next/cache";
import {eq} from "drizzle-orm";

interface video{
    user_id: string  ,
    // thumbnail: string | null  ,
    description: string | null  ,
    videoTitle: string   ,
    videoSrc: string  ,
    // packId: number | null,
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