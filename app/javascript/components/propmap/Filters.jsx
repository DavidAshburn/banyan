import React from "react";

export default function Filters({trees, markers, map}) {

    function dbhOver(trees, markers) {
        let min = parseInt(document.getElementById('dbhmin').value)
        markers.forEach((item, i) => {
            if(trees[i].dbh <= min) item.remove();
        })
    }

    function dbhUnder(trees, markers) {
        let max = parseInt(document.getElementById('dbhmax').value)
        markers.forEach((item, i) => {
            if(trees[i].dbh > max) item.remove();
        })
    }
    function expandFilters() {
        let box = document.getElementById('filterbox');
        box.style.gridTemplateRows == '0fr 0fr' ? 
        box.style.gridTemplateRows = '1fr 1fr':
        box.style.gridTemplateRows = '0fr 0fr';
    }

    return(
        <div>
            <button className="text-center w-full underline" onClick={expandFilters}>Filters</button>
            <div className="filterbox bg-accent3" id="filterbox">
                <div className="flex justify-between items-center overflow-hidden">
                    <button className="underline" onClick={dbhOver}>DBH over </button>
                    <input type="number" name="dbhmin" id="dbhmin" defaultValue="10" className="text-dark w-12" />
                </div>
                <div className="flex justify-between items-center overflow-hidden">
                    <button className="underline" onClick={dbhUnder}>DBH under </button>
                    <input type="number" name="dbhmax" id="dbhmax" defaultValue="10" className="text-dark w-12" />
                </div>
            </div>
        </div>
    )
}