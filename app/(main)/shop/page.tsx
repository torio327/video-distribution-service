import React from 'react';
import {getPack} from "@/db/queries";

const Page =async () => {
    //Postvideoのときをまねる。ファイル追加ボタンを押して、ファイルの数を調整。最終的に、shopで表示。
    //テキスト教材を作れるようにする。オンラインの機能を作る。
    const packs=await getPack();
    console.log(packs)
    return (
        <>
         <h1 className="text-2xl">shop</h1>

        </>
    );
};

export default Page;