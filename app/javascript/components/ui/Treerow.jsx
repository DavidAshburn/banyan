import React from "react";

export default function Treerow({index, tree, elRef, map, workoptions}) {
    let color = "bg-stone-400";
    if(index % 2 == 0) color = "bg-stone-300";

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return(
        <div 
        className={"grid grid-cols-3 gap-2 p-2 bg-stone-300 rounded-lg min-h-12 items-center " + color}
        data-treeid={tree.id}
        onMouseEnter={()=>{elRef.current[tree.id].popup.addTo(map.current)}}
        onMouseLeave={()=>{elRef.current[tree.id].popup.remove()}}
        >   
            <p className="pl-4 text-lg">{capitalize(tree.species)}</p>
            <p>{tree.dbh}"</p>
            <select name="work" id={'treework'+tree.id} className="p-2 rounded-md">
                {workoptions.map((option, i) => (<option value={option} key={i}>{option}</option>))}
            </select>
        </div>
    )
}