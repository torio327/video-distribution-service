'use client'
import React, {useState} from 'react';
import {supabase} from "@/utils/supabase/supabase";
import {deleteVideo} from "@/actions/userActtions";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@nextui-org/button";

type Props={
   upload:()=>void
}
const UploadButton = ({upload}:Props) => {


    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button  color={"primary"}>Upload</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>ビデオを投稿しても良いですか？</AlertDialogTitle>
                        <AlertDialogDescription>
                            「Upload」を押すとビデオが投稿されます。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={upload}>Upload</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default UploadButton;