import React from 'react';
import {videos} from "@/db/schema";
import Card from "@/app/(main)/watch/[userId]/card";
import {supabase} from "@/utils/supabase/supabase";
import {deleteVideo} from "@/actions/userActtions";
type Props={
    userVideo:typeof videos.$inferSelect[]
}

const PrivateVideoList = ({userVideo}:Props) => {
    const onDelete=async (path:string)=>{
        if(!path)return ;
        const {data,error}=await supabase.storage.from("video").remove([`${path}`])
        if(error){
            alert("delete error")
        }else {
            await deleteVideo(path).catch(()=>alert("databaseのデータを消せませんでした"))
        }
    }
    return (
        <div>
            <div className={"grid grid-cols-3 gap-4"}>
                {userVideo.reverse().map((video) => {
                    return (
                        <div key={video.id}>
                            <Card video={video}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default PrivateVideoList;