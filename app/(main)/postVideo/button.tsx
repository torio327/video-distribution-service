import React from 'react';

type Props={
    isPending:boolean,
    handleClick:(selected:any,userId:string)=>void,
    selectedFile:any,
    userId:string
}
const Button = ({isPending,userId,handleClick,selectedFile}:Props) => {
    return (
        <div>
            <button onClick={()=>handleClick(selectedFile,userId)}  disabled={isPending}>upload</button>
        </div>
    );
};

export default Button;