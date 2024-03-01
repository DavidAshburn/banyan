import React from "react";
import ProfileTag from "./ProfileTag";

export default function AddFleets({items, addTag, removeTag, ftype}) {

    return(
        <div className="grid lg:grid-cols-[1fr_5fr] gap-2 py-4 px-2 lg:gap-4 border-gradient">
            <div className="lg:col-start-2 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 grid-rows-auto">
                {items && items.filter((item)=>item.fleettype === ftype).map((item, i)=> (
                    <ProfileTag key={`${item.name}${i}`} tag={item.name} removeTag={()=>removeTag(item)}/>
                ))}
            </div>
            <form action="" className="lg:col-start-1 row-start-1 max-lg:row-start-2 flex flex-col gap-2 items-start pt-4">
                <input type="text" id={ftype} className="text-dark max-w-52 px-2 py-[1px] rounded"/>
                <button onClick={(e)=>addTag(e, ftype)} className="bg-light text-dark text-sm text-center p-2 max-w-40">Add {ftype}</button>
            </form>
        </div>
    )
}