import React from 'react';

type Props={
    onPackTitleChange:(value:string)=>void;
    onDescriptionChange:(value:string)=>void;
    onThumbnailChange:(value:string)=>void;
}

const PackHeader = ({onPackTitleChange,onDescriptionChange,onThumbnailChange}:Props) => {
    const handlePackTitleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        onPackTitleChange(event.target.value)
    }
    const handleDescriptionChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        onDescriptionChange(event.target.value)
    }
    const handleThumbnailChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const file:any=event.target.files?.[0]
        if(file){
            onThumbnailChange(file)
        }
    }


    return (
        <div>
            <input className={"border-black border-2"} placeholder={"packTitle"} name={"packTitle"} type="text"
                   onChange={handlePackTitleChange} />
            <input className={"border-black border-2"} placeholder={"packTitle"} name={"packTitle"} type="text"
                   onChange={handleDescriptionChange} />
            <input type="file" accept={"image/png,image/jpg,image/jpeg,image/svg"} onChange={handleThumbnailChange}/>
        </div>
    );
};

export default PackHeader;