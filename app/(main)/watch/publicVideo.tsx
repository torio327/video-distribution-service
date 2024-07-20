import React from 'react';
import {FileObject} from "@supabase/storage-js";
import {videos} from "@/db/schema";
import Card from "@/app/(main)/watch/card";

type Props={
   //videos:FileObject[]|null,
    videos:typeof videos.$inferSelect[]
}

const PublicVideo =  ({videos}:Props) => {

    return (
        <>
            <div className={"grid grid-cols-3 mx-auto gap-4 bg-slate-400"}>
                {videos.map((video) => {
                    return (
                        <Card key={video.id} video={video}/>
                    )
                })}
            </div>
        </>

    );
};

export default PublicVideo;