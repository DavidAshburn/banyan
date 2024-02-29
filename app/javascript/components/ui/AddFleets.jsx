import React from "react";
import ProfileTag from "./ProfileTag";

export default function AddFleets({items, addTag, removeTag, ftype}) {

    return(
        <div className="grid lg:grid-cols-[1fr_5fr]">
            <div className="lg:col-start-2 grid grid-cols-4 gap-2">
                {items && items.filter((item)=>item.fleettype === ftype).map((item, i)=> (
                    <ProfileTag key={`${item.name}${i}`} tag={item.name} removeTag={()=>removeTag(item)}/>
                ))}
            </div>
            <form action="" className="lg:col-start-1">
                <input type="text" id={ftype} className="text-dark"/>
                <button onClick={(e)=>addTag(e, ftype)} className="bg-light text-dark text-sm text-center p-2">Add {ftype}</button>
            </form>
        </div>
    )
}