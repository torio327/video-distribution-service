import React, {useState} from 'react';
import {videos} from "@/db/schema";
import {supabase} from "@/utils/supabase/supabase";
import {deleteVideo} from "@/actions/userActtions";
import DeleteButton from "@/app/(main)/watch/[userId]/delete-button";
type Props={
   video:typeof videos.$inferSelect,
}

const Card = ({video}:Props) => {
    return (
        <div  className={"flex flex-col items-center justify-center border-blue-500 border-2"}>
            <iframe src={process.env.CDNURL + video.videoSrc} width={320} height={240}
                    allowFullScreen={true} loading={"eager"}/>
            <h1 className={"text-2xl"}>{video.videoTitle}</h1>
            <p>{video.description}</p>
            <DeleteButton videoTitle={video.videoTitle} userVideoPath={video.videoSrc}/>
        </div>
    );
};

export default Card;