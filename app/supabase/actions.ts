'use server'

import {createClient} from "@/utils/supabase/server";
import {supabase} from "@/utils/supabase/supabase";
import {revalidatePath} from "next/cache";

interface uploadFile{
    selectedFile:any,
    userId:string
}
// export     const uploadChange=async (selectedFile:any,userId:string)=>{
//     try{
//
//
//         // if(!event.target.files || event.target.files.length===0){
//         //     throw new Error("You must select a file to upload")
//         // }
//         if(!selectedFile){
//             throw new Error("You must select a file to upload")
//         }
//
//         const file=selectedFile
//
//         console.log(file)
//         // const filePath=file.name
//         const fileName=file.name.split('.').shift()
//         const fileExt=file.name.split('.').pop()
//         const filePath=`${fileName}-${userId}-${Math.random()}.${fileExt}`
//         // const filePath=`${userId}-${Math.random()}.${fileExt}`
//         console.log(filePath)
//         const {error:uploadError}=await supabase.storage.from("video").upload(filePath,file)
//
//         // console.log(file)
//         if(uploadError){
//             throw uploadError
//         }
//
//         revalidatePath("/watch","layout")
//         // userIdとpathをdatabaseにわたす。watchで取得して、userIdのpathだけとる
//
//     }catch (error){
//         alert('Error uploading video!')
//     }
// }

// export const downloadFile=async (path:string)=>{
//     try {
//         const {data,error}=await supabase.storage.from("video").download(path)
//         if(error){
//             throw error
//         }
//         const url=URL.createObjectURL(data)
//     }catch (error){
//         console.log("Error downloading video:",error)
//         return error;
//     }
// }

export const getVideo=async()=>{
    const {data,error}=await supabase.storage.from('video').list("")

    return data;
}