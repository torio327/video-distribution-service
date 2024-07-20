import Upload from "@/app/(main)/postVideo/upload";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Link from "next/link";
import TestUpload from "@/app/(main)/postVideo/test-upload";

const Page =async () => {
    const supabase =await createClient()

    const {data,error}=await supabase.auth.getUser();
    if(error){
        redirect('/login')
    }
    const userId=data.user?.id
 return(
     <>
     <Upload userId={userId}/>
     </>
 )
};

export default Page;