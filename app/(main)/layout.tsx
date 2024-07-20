import SideBar from "@/components/side-bar";
import {redirect} from "next/navigation";
import {createClient} from "@/utils/supabase/server";

type Props={
    children:React.ReactNode,
}
export default async function Layout({children}:Props){
    const supabase=createClient()
    const {data,error}=await supabase.auth.getUser()
    if(error){
        redirect("/login")
    }
    return(
        <>
            <div className="flex">
                <SideBar userId={data.user?.id}/>
                <div className={"pl-[200px] w-full"}>{children}</div>
            </div>
        </>
    )
}