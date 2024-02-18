import React from "react";
import Treerow from "./Treerow";

export default function Treelist({ trees, workoptions }) {

    return(
        <div className="grid gap-2" id="treelist">
            {trees.map((tree, i) => <Treerow tree={tree} workoptions={workoptions} key={i}/>)}
        </div>
    )
}