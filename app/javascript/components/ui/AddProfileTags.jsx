import React from "react"
import ProfileTag from "./ProfileTag"

export default function AddProfileTags({items, removeTag, addTag, name}) {
    return(
        <div className="grid lg:grid-cols-[1fr_5fr]">
            <div className="lg:col-start-2 grid grid-cols-4 gap-2">
                {items && items.map((item, i)=> (
                    <ProfileTag key={`${item}${i}`} tag={item} removeTag={()=>removeTag(item)}/>
                ))}
            </div>
            <form action="" className="lg:col-start-1">
                <label htmlFor="treein">Add Species</label>
                <input type="text" id={name} className="text-dark"/>
                <button onClick={(e)=>addTag(e, name)} className="bg-light text-dark text-sm text-center p-2">Add {name}</button>
            </form>
        </div>
    )
}