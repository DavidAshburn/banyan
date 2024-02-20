import React, {useState,useEffect} from "react";

export default function Treelist({ trees, elref, workoptions, map}) {

    let selected = [];
    for(let tree of trees) {
        console.log(elref.current[tree.id].selected)
        if(elref.current[tree.id].selected) selected.push(tree);
    }
    if(workoptions.length == 0) {
        workoptions = ['Prune','Remove','Fertilize','Inspect']
    }

    return(
        <div className="flex flex-col gap-2 p-2 border-2 border-red-400 min-h-8" id="treelist">
            {selected.map((tree,i)=> 
                <div 
                className="grid grid-cols-3 gap-2 p-2 bg-white rounded-lg min-h-12" 
                data-treeid={tree.id}
                onMouseEnter={()=>{elref.current[tree.id].popup.addTo(map)}}
                onMouseLeave={()=>{elref.current[tree.id].popup.remove()}}
                >   
                    <p>{tree.species}</p>
                    <p>{tree.dbh}"</p>
                    <select name="work" id={'treework'+tree.id}>
                        {workoptions.map((option, i) => (<option value={option} key={i}>{option}</option>))}
                    </select>
                </div>
            
            )}
        </div>
    )
}