import React, {useState,useEffect} from "react";

export default function Filters({trees, markers, map}) {


    const [maxdbhlist, setMaxDBHList] = useState([]);
    const [mindbhlist, setMinDBHList] = useState([]);
    const [crownlist, setCrownList] = useState([]);

    useEffect(()=> {
        let temp = [];
        for(let tree of trees) {
            temp.push(true);
        }
        setCrownList(temp);
        setMinDBHList(temp);
        setMaxDBHList(temp);
    }, [trees]);

    useEffect(()=> {
        updateMarkers();
    }, [maxdbhlist, mindbhlist, crownlist]);

    function updateMarkers() {
        console.log('update');
        let checkarrays = [maxdbhlist, mindbhlist, crownlist];
        if(crownlist.length == 0) return;

        let baselist = [];
        for(let item of trees) {
            baselist.push(true);
        }
        for(let list of checkarrays) {
            list.forEach((tree, i) => {
                if(tree == false) baselist[i]=false;
            })
        }
        markers.forEach((marker, i) => {
            if(baselist[i]) {
                marker.addTo(map)
            } else {
                marker.remove();
            }
        });

    }
    function getDBHRange(trees) {
        let max = 0;
        for(let tree of trees) {
            if(tree.dbh > max) max = tree.dbh;
        }
        let options = [];
        options.push(<option key={10000} value={-1}>Any</option>)
        for(let i = 0; i <= max; i++) {
            options.push(<option key={i} value={i}>{i}</option>)
        }
        return options;
    }
    function dbhOver(trees) {
        console.log('over');
        let min = parseInt(document.getElementById('dbhmin').value)
        let baselist = [];
        for(let item of trees) {
            baselist.push(true);
        }
        if(max != -1) {
            trees.forEach((tree, i) => {
                if(tree.dbh < min) baselist[i] = false;
            })
        } else {
            for(let item of baselist) {
                item = true;
            }
        }
        setMinDBHList(baselist);
        updateMarkers();
    }
    function dbhUnder(trees) {
        console.log('under');
        let max = parseInt(document.getElementById('dbhmax').value)
        let baselist = [];
        for(let item of trees) {
            baselist.push(true);
        }
        if(max != -1) {
            trees.forEach((tree, i) => {
                if(tree.dbh > max) baselist[i] = false;
            })
        } else {
            for(let item of baselist) {
                item = true;
            }
        }
        setMaxDBHList(baselist);
        updateMarkers();
    }
    function getCrownSizes(trees) {
        let sizes = {};
        for(let item of trees) {
            sizes[item.crown] = 1;
        }
        let list = Object.keys(sizes).sort();
        let options = [];
        options.push(<option key={10000} value='Any'>Any</option>)
        for(let i = 0; i < list.length; i++) {
            options.push(<option key={i} value={list[i]}>{list[i]}</option>)
        }
        return options;
    }
    function crownSize(trees) {
        console.log('crown');
        let targetsize = document.getElementById('crownsize').value;
        let baselist = [];
        for(let item of trees) {
            baselist.push(true);
        }
        if(targetsize != 'Any') {
            trees.forEach((tree, i) => {
                if(tree.crown != targetsize) baselist[i] = false;
            })
        } else {
            for(let item of baselist) {
                item = true;
            }
        }
        setCrownList(baselist);
        updateMarkers();
    }
    function toggleFilters() {
        let box = document.getElementById('filterbox');

        box.style.gridTemplateRows != '1fr 1fr 1fr' ? 
        box.style.gridTemplateRows = '1fr 1fr 1fr':
        box.style.gridTemplateRows = '0fr 0fr 0fr';
    }

    return(
        <div>
            <button className="text-center w-full " onClick={toggleFilters}>Filters</button>
            <div className="filterbox" id="filterbox">
                <div className="flex justify-between items-center overflow-hidden">
                    <p>DBH over</p>
                    <select name="dbhmin" id="dbhmin" className="text-dark" onChange={()=>{dbhOver(trees)}}>
                        {getDBHRange(trees)}
                    </select>
                </div>
                <div className="flex justify-between items-center overflow-hidden">
                    <p>DBH under</p>
                    <select name="dbhmax" id="dbhmax" className="text-dark" onChange={()=>{dbhUnder(trees)}}>
                        {getDBHRange(trees)}
                    </select>
                </div>
                <div className="flex justify-between items-center overflow-hidden">
                    <p>Crown Size</p>
                    <select name="crownsize" id="crownsize" className="text-dark" onChange={()=>{crownSize(trees)}}>
                        {getCrownSizes(trees)}
                    </select>
                </div>
            </div>
        </div>
    )
}