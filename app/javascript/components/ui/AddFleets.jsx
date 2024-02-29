import React from "react";

export default function AddFleets({items, name, addTag, removeTag}) {

    console.log(items);

    return(
        <div className="grid lg:grid-cols-[1fr_5fr]">
            <div className="lg:col-start-2 grid grid-cols-4 gap-2">
                {/*items && items.filter((item)=>item.fleettype == name).map((item, i)=> (
                    <ProfileTag key={`${item.name}${i}`} tag={item.name} removeTag={()=>removeTag(item.name)}/>
                ))*/}
            </div>
            <form action="" className="lg:col-start-1">
                <input type="text" id={name} className="text-dark"/>
                <button onClick={(e)=>addTag(e, name)} className="bg-light text-dark text-sm text-center p-2">Add {name}</button>
            </form>
        </div>
    )
}