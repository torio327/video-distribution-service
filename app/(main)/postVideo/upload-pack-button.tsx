import React, {useTransition} from 'react';
import {Button} from "@/components/ui/button";
import {supabase} from "@/utils/supabase/supabase";
import {
    createPackFront, postPackEachVideo,
    postPackFront,
    postToBacket,
    supabaseBacketUpload,
    userActionTest
} from "@/actions/userActtions";
import {getPackId} from "@/db/queries";
import {revalidatePath} from "next/cache";
import {db} from "@/db";
import {pack} from "@/db/schema";
import {toast} from "sonner";

type Props={
    files:File[],
    videos:{videoTitle:string,description:string,file:File}[],
    packInfo:{packTitle:string,description:string,thumbnail:File},
    userId:string,
}

//pack作って、packIdを取り出して、postPackVideoに使う
const UploadPackButton = ({files,videos,packInfo,userId}:Props) => {
    const [isPending,startTransition]=useTransition()
    const createPack=async()=>{
try {
    // if(files.length===0||videos.length||packInfo.packTitle===""||packInfo.description===""){
    //     return ;
    // }
    if(!files.length||!videos.length||!packInfo.packTitle||!packInfo.description||!packInfo.thumbnail){
        return ;
    }
    //pack作って、userIdで最新のpackを取り出す.そのpackIdを使う
const comment="testettestettstestetwwewkflfjlaa"
    await userActionTest(comment)
    console.log("after test")
    // createPackFront(packFront).catch(()=>toast.error("packFront error"))


    const file=packInfo.thumbnail
    const fileName=file.name.split('.').shift();
    const fileExt=file.name.split('.').pop();
    const filePath=`${fileName}-${Math.random()}.${fileExt}`;

    console.log(filePath)
    const {error:uploadError}=await supabase.storage.from("thumbnail").upload(filePath,file)
    console.log('after upload')
    const packFront={
        packTitle:packInfo.packTitle,
        description: packInfo.description,
        thumbnail: filePath,
        userId: userId
    }
    await postPackFront(packFront)
    if(uploadError){
        throw uploadError
    }

//一時的
    console.log("pack")
    const MyPack=await getPackId(userId)

    console.log(MyPack)
    if(!MyPack){
        return;
    }
    const packId=MyPack.reverse()[0].id
    for (const video of videos) {
        const file = video.file;
        const fileName = file.name.split('.').shift();
        const fileExt = file.name.split('.').pop();
        const filePath = `${fileName}-${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage.from("packVideo").upload(filePath, file);

        const packVideoInfo = {
            videoTitle: video.videoTitle,
            description: video.description,
            file: filePath,
            packId: packId
        };

        await postPackEachVideo(packVideoInfo);
        if (uploadError) {
            throw uploadError;
        }


    }

    // videos.forEach( (video)=>{
    //
    //     const file=video.file
    //     const fileName=file.name.split('.').shift();
    //     const fileExt=file.name.split('.').pop();
    //     const filePath=`${fileName}-${Math.random()}.${fileExt}`;
    //     const {error:uploadError}=await supabase.storage.from("packVideo").upload(filePath,file)
    //     // supabaseBacketUpload({file:video.file,filePath:filePath})
    //
    //     const packVideoInfo={
    //         videoTitle:video.videoTitle,
    //         description:video.description,
    //         file:filePath,
    //         packId:packId
    //     }
    //     postPackEachVideo(packVideoInfo)
    // })
    alert("success")
//

}catch (error:any){
    console.log(error)
    alert("パックを作れませんでした")
}


    }

    const testCreatePack=async ()=>{

    }
    return (
        <>
            <Button variant={"default"} onClick={createPack}>Create Pack</Button>
        </>
    );
};

export default UploadPackButton;