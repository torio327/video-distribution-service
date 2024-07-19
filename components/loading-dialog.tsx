import React from 'react';
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {Loader, LoaderCircle} from "lucide-react";

const LoadingDialog = () => {
    return (
        <>
            <div className={"fixed flex items-center justify-center inset-0 z-50 bg-black/80"}>
                <p className={"text-white text-3xl"}>
                    <LoaderCircle className={"animate-spin w-10 h-10"}/>
                </p>
            </div>
        </>
    );
};

export default LoadingDialog;