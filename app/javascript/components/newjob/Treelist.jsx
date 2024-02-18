import React, {useState,useEffect} from "react";
import Treerow from "./Treerow";

export default function Treelist({ chosentrees, workoptions }) {

    const [trees, setTrees] = useState(chosentrees);

    useEffect(()=> { setTrees(chosentrees) }, [chosentrees])

    console.log('treelist');
    console.log(trees);
    if(trees.length < 1) return;

    return(
        <div className="flex flex-col gap-2 p-2 border-2 border-red-400 min-h-8" id="treerows">
            {chosentrees.map((tree,i)=> <Treerow tree={tree} workoptions={workoptions} key={i}/>)}
        </div>
    )
}