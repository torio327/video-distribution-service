'use client'
import React, {useState} from 'react';
import {supabase} from "@/utils/supabase/supabase";
import {deleteVideo} from "@/actions/userActtions";

type Props={
    userVideoPath:string,
}
const DeleteButton = ({userVideoPath}:Props) => {
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

            }
        }catch (error){
            alert("Error deleting Video")
        }finally {
            setDeleteLoading(false)
        }

    }
    return (
        <div>
           <button className={"bg-pink-400"} onClick={()=>onDelete(userVideoPath)} type={"button"} disabled={deleteLoading}>消す</button>
        </div>
    );
};

export default DeleteButton;