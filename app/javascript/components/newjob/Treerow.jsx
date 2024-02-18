import React from "react";

export default function Treerow({ tree, workoptions }) {

    if(workoptions.length == 0) {
        workoptions = ['Prune','Remove','Inspect'];
    }
    console.log('treerow');
    console.log(tree);
    return(
        <div className="grid grid-cols-3 gap-2 p-2 border-2 border-indigo-400 min-h-12" data-treeid={tree.id}>   
            <p>{tree.species}</p>
            <p>{tree.dbh}"</p>
            <select name="work" id={'treework'+tree.id}>
                {workoptions.map((option, i) => (<option value={option} key={i}>{option}</option>))}
            </select>
        </div>
        
    )
}