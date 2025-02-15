'use client'
import React from 'react';
import {Auth} from "@supabase/auth-ui-react";

import {ThemeSupa} from "@supabase/auth-ui-shared";
import {createClient} from "@supabase/supabase-js";


const AuthForm = () => {
    const supabase=createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    return (
        <>
         <Auth supabaseClient={supabase} appearance={{theme:ThemeSupa}} providers={['google','facebook','twitter']} />
        </>
    );
};

export default AuthForm;