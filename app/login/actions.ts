'use server';
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function login(formData:FormData){
    const supabase=createClient()

    const data={
        email:formData.get('email') as string,
        password:formData.get('password') as string,
    }

    const {error}=await supabase.auth.signInWithPassword(data)

    console.log(error)
    if(error)
    {
       redirect('/error')
    }
    revalidatePath('/','layout')
    redirect('/private')
}


export async function signup(formData:FormData){

    const supabase=createClient()

    const data={
        email:formData.get('email') as string,
        password:formData.get('password') as string,
    }

    const {error}=await supabase.auth.signUp(data)

    if(error){
        redirect('/error')
    }
    revalidatePath('/','layout')
    redirect('/private')
}