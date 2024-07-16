import React from 'react';
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Link from "next/link";

const Page =async () => {
    const supabase=createClient()

    const {data,error}=await supabase.auth.getUser()
    if(error||!data?.user){
        redirect('/login')
    }

    return (
        <>
            <p>Hello {data.user.email}</p>
            <form action={"/auth/signout"} method={"post"}>

                <Link href={`/watch/${data.user.id}`}>Watch</Link>
                <button type={"submit"}>
                    Sign out
                </button>
            </form>

            {JSON.stringify(data)}
        </>
    );
};

export default Page;