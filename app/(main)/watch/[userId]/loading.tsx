import React from 'react';
import {Loader} from "lucide-react";

const Loading = () => {
    return (
        <div className={"flex items-center justify-center"}>
            <Loader className={"w-32 h-32 text-blue-500"}/>
        </div>
    );
};

export default Loading;