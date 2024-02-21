import React from "react";

export default function Treerow({tree, elRef, map, workoptions}) {

    return(
        <div 
        className="grid grid-cols-3 gap-2 p-2 bg-white rounded-lg min-h-12"
        data-treeid={tree.id}
        onMouseEnter={()=>{elRef.current[tree.id].popup.addTo(map.current)}}
        onMouseLeave={()=>{elRef.current[tree.id].popup.remove()}}
        >   
            <p>{tree.species}</p>
            <p>{tree.dbh}"</p>
            <select name="work" id={'treework'+tree.id}>
                {workoptions.map((option, i) => (<option value={option} key={i}>{option}</option>))}
            </select>
        </div>
    )
}