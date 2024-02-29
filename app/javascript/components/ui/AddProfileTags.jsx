import React from "react"
import ProfileTag from "./ProfileTag"

export default function AddProfileTags({items, removeTag, addTag, name}) {
    return(
        <div className="grid lg:grid-cols-[1fr_5fr] gap-2 lg:gap-4 items-center border-2 border-white">
            <div className="lg:col-start-2 grid grid-cols-4 gap-2 py-4">
                {items && items.map((item, i)=> (
                    <ProfileTag key={`${item}${i}`} tag={item} removeTag={()=>removeTag(item)}/>
                ))}
            </div>
            <form action="" className="lg:col-start-1 flex flex-col gap-2 justify-center">
                <input type="text" id={name} className="text-dark"/>
                <button onClick={(e)=>addTag(e, name)} className="bg-light text-dark text-sm text-center p-2">Add {name}</button>
            </form>
        </div>
    )
}