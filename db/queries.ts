'use server';
import db from "@/db/db";
import {cache} from "react";
import {eq} from "drizzle-orm";
import {pack, pack_video, videos} from "@/db/schema";


// export const getUser=async (email:string)=>{
//     const account=await db.query.accounts.findFirst({
//         where:eq(accounts.email,email)
//     })
//     return account;
// }
// export const getAccount=cache(async (email:string)=>{
//     const data=await db.query.testAccounts.findFirst({
//         where:eq(testAccounts.email,email)
//     })
//     return data;
// })

export const getUserVideo=cache(async (userId:string)=>{
    const data=await db.query.videos.findMany({
        where:eq(videos.user_id,userId)
    })
    if(!data){
        return [];
    }
    return data;
})

export const getPublicVideo=cache(async()=>{
    const data=await db.query.videos.findMany()
    return data
})

export const getPack=cache(async ()=>{
    const data=await db.query.pack.findMany({
        with:{
            pack_video:true
        }
    })
    if(!data){
        return []
    }
    return data
})

export const getPackId=cache(async (userId:string)=>{
    const data=await db.query.pack.findMany(
        {
            where:eq(pack.userId,userId)
        }
    )
    return data
})