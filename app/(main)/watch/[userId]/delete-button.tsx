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
import LoadingDialog from "@/components/loading-dialog";

type Props={
    userVideoPath:string,
    videoTitle:string,
}
const DeleteButton = ({userVideoPath,videoTitle}:Props) => {
    const [deleteLoading, setDeleteLoading] = useState(false)
    const onDelete=async (path:string)=>{
        try {
            setDeleteLoading(true)
            if(!path)return ;
            const {data,error}=await supabase.storage.from("video").remove([`${path}`])
            if(error){
                alert("delete error")
            }else {
                await deleteVideo(path).catch(()=>alert("databaseのデータを消せませんでした"))
                alert("complete deleting")
            }
        }catch (error){
            alert("Error deleting Video")
        }finally {
            setDeleteLoading(false)
        }

    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button color={"primary"}>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>「{videoTitle}」を消去しても良いですか？</AlertDialogTitle>
                        <AlertDialogDescription>
                            「Delete」を押すと「{videoTitle}」が消去されます。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>onDelete(userVideoPath)} disabled={deleteLoading}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {(deleteLoading&&
                <>
                <LoadingDialog/>
                </>
            )}
        </div>
    );
};

export default DeleteButton;