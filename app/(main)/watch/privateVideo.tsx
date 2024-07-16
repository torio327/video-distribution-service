import React, {useEffect, useState} from 'react';
import {videos} from "@/db/schema";
import Card from "@/app/(main)/watch/[userId]/card";
import {supabase} from "@/utils/supabase/supabase";
import {deleteVideo} from "@/actions/userActtions";

type Props={
     userVideo:typeof videos.$inferSelect[]
    // userId:string,
}
interface userVideo{
    id: number ,
    videoTitle: string  ,
    thumbnail: string | null ,
    videoSrc: string  ,
    description: string | null   ,
    packId: number | null,
    user_id: string
}

const PrivateVideo = ({userVideo}:Props) => {
    // const [deletePath, setDeletePath] = useState<string[]>([])


    // const handleCheck=(path:string)=>{
    //     setDeletePath([...deletePath,path])
    //     console.log(deletePath)
    // }
    return (
        <>
            <div className={"grid grid-cols-3 gap-4"}>
                {userVideo.map((video) => {
                    return (
                        <div key={video.id} className={"bg-rose-500"}>
                            <Card  video={video}/>
                            {/*<input type={"checkbox"} onChange={()=>handleCheck(video.videoSrc)}/>*/}
                            {/*<button onClick={onDelete(video.videoSrc)} type={"button"}>Delete</button>*/}
                        </div>
                    )
                })}

            </div>
            <button>Delete</button>
        </>

    );
};

export default PrivateVideo;