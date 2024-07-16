import Upload from "@/app/(main)/postVideo/upload";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Link from "next/link";

const Page =async () => {
    const supabase =await createClient()

    const {data,error}=await supabase.auth.getUser();
    if(error){
        redirect('/login')
    }
    const userId=data.user?.id
 return(
     <>
         <Link href={"/watch"}>watch</Link>
         <Link href={`/watch/${data.user?.id}`}>watch userVideo</Link>
     <Upload userId={userId}/>
     </>
 )
};

export default Page;