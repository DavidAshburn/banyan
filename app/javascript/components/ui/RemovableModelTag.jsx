import React from "react";

export default function RemovableModelTag({label, removeTag}) {

    return(
        <div className="flex justify-between items-center pl-4 gap-2 bg-light text-dark rounded-full max-sm:min-w-20 sm:w-full tagpair-gradient h-fit">
            <p>{label}</p>
            <button onClick={()=>removeTag(label)} className="rounded-full h-[1.5rem] w-[1.5rem] bg-cross -mr-[2px]"></button>
        </div>
    )
}