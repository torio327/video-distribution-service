import React from 'react';
import Link from "next/link";

type Props={
    userId:string|undefined
}
const SideBar = ({userId}:Props) => {
    return (
        <>
         <div className={"w-[200px] fixed bg-yellow-300 h-screen"}>
             <div>fdsff</div>
             <div className="flex flex-col items-center gap-y-4 bg-rose-500">
                 <Link href={"/watch"}>Watch</Link>
                 <Link href={`/watch/${userId}`}>Watch User Video</Link>
                 <Link href={"/postVideo"}>Post Video</Link>
                 <Link href={"/private"}>Private</Link>
                 <Link href={"/shop"}>Shop</Link>
                 <form action={"/auth/signout"} method={"post"}>
                     <button type={"submit"}>
                         Sign out
                     </button>
                 </form>
             </div>

         </div>
        </>
    );
};

export default SideBar;