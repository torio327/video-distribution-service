'use client'
import React, {useState, useTransition} from 'react';
import {supabase} from "@/utils/supabase/supabase";
import {revalidatePath} from "next/cache";
import {db} from "@/db";
import {videos} from "@/db/schema";
import {postVideo} from "@/actions/userActtions";
import UploadButton from "@/app/(main)/postVideo/upload-button";
import {cn} from "@/lib/utils";
import UploadVideo from "@/app/(main)/postVideo/upload-video";
import LoadingDialog from "@/components/loading-dialog";
import UploadPack from "@/app/(main)/postVideo/upload-pack";



type Props={
    userId:string
}
const UploadPage = ({userId}:Props) => {



    return (
        <div className={cn("bg-green-500 h-screen")}>
            <h1>PostVideo</h1>
            <UploadVideo userId={userId}/>
            <UploadPack/>
        </div>
    );
};

export default UploadPage;