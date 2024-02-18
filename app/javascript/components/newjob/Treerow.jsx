import React from "react";

export default function Treerow({ tree, workoptions, trees, map, popups }) {

    let worktypes = ['Prune','Remove','Inspect'];
    if(workoptions.length > 0) {
        worktypes = workoptions;
    }

    function mouseEnter(e) {
        let treeid = parseInt(e.target.dataset.treeid);
        for(let i = 0; i<popups.length; i++) {
            if(trees[i].id == treeid) popups[i].addTo(map.current);
        }
      };
    function mouseLeave(e) {
        for(let item of popups) {
            item.remove();
        }
    };

    return(
        <div 
            className="grid grid-cols-3 gap-2 p-2 bg-white rounded-lg min-h-12" 
            data-treeid={tree.id}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
        >   
            <p>{tree.species}</p>
            <p>{tree.dbh}"</p>
            <select name="work" id={'treework'+tree.id}>
                {worktypes.map((option, i) => (<option value={option} key={i}>{option}</option>))}
            </select>
        </div>
        
    )
}