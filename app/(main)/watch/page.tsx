import React from 'react';
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {getVideo} from "@/app/supabase/actions";
import Link from "next/link";
import PrivateVideo from "@/app/(main)/watch/privateVideo";
import PublicVideo from "@/app/(main)/watch/publicVideo";
import {getPublicVideo} from "@/db/queries";


const Page = async () => {
    const supabase= createClient();
    const {data,error}=await supabase.auth.getUser();
    if(error||!data.user){
        redirect('/login')
    }

    const videos=await getVideo();
    if(videos){
        videos.sort((a,b)=>{
            const dateA=new Date(a.updated_at);
            const dateB=new Date(b.updated_at);
            return dateB.getTime()-dateA.getTime()
        })
    }
    const publicVideo=await getPublicVideo();
    console.log(publicVideo)
    return (
        <div className={"w-full"}>
            <Link href={"/private"}>private</Link>
            <Link href={"/postVideo"}>postVideo</Link>
          <PublicVideo videos={publicVideo}/>

        </div>
    );
};

export default Page;