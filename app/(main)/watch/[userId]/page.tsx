import React from 'react';
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Link from "next/link";
import {getUserVideo} from "@/db/queries";
import PrivateVideo from "@/app/(main)/watch/privateVideo";

type Props={
        params:{userId:string}
}
const Page = async ({params}:Props) => {


    const supabase= createClient();
    const {data,error}=await supabase.auth.getUser();
    if(error||!data.user||data.user.id!==params.userId){
        redirect('/login')
    }
    const userVideo=await getUserVideo(params.userId)
    userVideo.reverse();
    // console.log(userVideo)
    return (
        <div>
            <Link href={"/private"}>private</Link>
            <Link href={"/postVideo"}>postVideo</Link>
            <p>{params.userId}</p>
            <PrivateVideo userVideo={userVideo}/>
        </div>
    );
};

export default Page;