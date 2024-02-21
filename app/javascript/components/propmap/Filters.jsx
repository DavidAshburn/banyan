import React, { useState, useEffect } from 'react';

export default function Filters({ trees, elRef, map }) {
  const [maxdbhlist, setMaxDBHList] = useState([]);
  const [mindbhlist, setMinDBHList] = useState([]);
  const [crownlist, setCrownList] = useState([]);
  const [specieslist, setSpeciesList] = useState([]);


  useEffect(() => {
    let temp = trees.map((tree) => tree.id);
    setCrownList(temp);
    setMinDBHList(temp);
    setMaxDBHList(temp);
    setSpeciesList(temp);
  }, [trees]);

  useEffect(() => {
    updateMarkers(elRef, map);
  }, [maxdbhlist, mindbhlist, crownlist, specieslist]);

  //if a tree passes on all filter Lists the marker remains on the map

  function updateMarkers(elRef, map) {
    if (crownlist.length == 0) return;

    let checkarrays = [
      mindbhlist,
      crownlist,
      specieslist,
    ];
    let base = maxdbhlist;
    let selected = [];

    for(let id of base) {
      let passes = true;
      for(let item of checkarrays) {
        if(!item.includes(id)) passes = false;
      }
      if(passes) selected.push(id);
    }
    for(let [key, val] of Object.entries(elRef.current)) {
      if(selected.includes(parseInt(key))) {
        if(val.selected) {
          val.chosen.addTo(map);
        } else {
          val.open.addTo(map);
        }
      } else {
        if(val.selected) {
          val.chosen.remove();
        } else {
          val.open.remove();
        }
      }
    }
  }
  function getDBHRange(trees) {
    let max = 0;
    for (let tree of trees) {
      if (tree.dbh > max) max = tree.dbh;
    }
    let options = [];
    options.push(
      <option key={10000} value={-1}>
        Any
      </option>
    );
    for (let i = 0; i <= max; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  }
  function dbhOver(trees) {
    let min = parseInt(document.getElementById('dbhmin').value);
    let baselist = trees.map((tree) => tree.id);
    
    if(min != -1) {
      baselist = [];
      for (let item of trees) {
        if(item.dbh > min) baselist.push(item.id);
      }
    }
    
    setMinDBHList(baselist);
    updateMarkers(elRef, map);
  }
  function dbhUnder(trees) {
    let max = parseInt(document.getElementById('dbhmax').value);
    let baselist = trees.map((tree) => tree.id);
    
    if(max != -1) {
      baselist = [];
      for (let item of trees) {
        if(item.dbh < max) baselist.push(item.id);
      }
    }
    setMaxDBHList(baselist);
    updateMarkers(elRef, map);
  }
  function getCrownSizes(trees) {
    let sizes = {};
    for (let item of trees) {
      sizes[item.crown] = 1;
    }
    let list = Object.keys(sizes).sort();
    let options = [];
    options.push(
      <option key={10000} value="Any">
        Any
      </option>
    );
    for (let i = 0; i < list.length; i++) {
      options.push(
        <option key={i} value={list[i]}>
          {list[i]}
        </option>
      );
    }
    return options;
  }
  function crownSize(trees) {
    let targetsize = document.getElementById('crownsize').value;
    let baselist = trees.map((tree) => tree.id);
    if (targetsize != 'Any') {
      baselist = [];
      for(let item of trees) {
        if (item.crown == targetsize) baselist.push(item.id);
      }
    }
    setCrownList(baselist);
    updateMarkers(elRef, map);
  }
  function getSpecies(trees) {
    let species = {};
    for (let item of trees) {
      species[item.species] = 1;
    }
    let list = Object.keys(species).sort();
    let options = [];
    options.push(
      <option key={10000} value="Any">
        Any
      </option>
    );
    for (let i = 0; i < list.length; i++) {
      options.push(
        <option key={i} value={list[i]}>
          {list[i]}
        </option>
      );
    }
    return options;
  }
  function filterSpecies(trees) {
    let targetspecies = document.getElementById('species').value;
    let baselist = trees.map((tree) => tree.id);
    if (targetspecies != 'Any') {
      baselist = [];
      for(let item of trees) {
        if (item.species == targetspecies) baselist.push(item.id);
      }
    }
    setSpeciesList(baselist);
    updateMarkers(elRef, map);
  }
  function toggleFilters() {
    let box = document.getElementById('filterbox');

    box.style.gridTemplateRows != '1fr 1fr 1fr 1fr'
      ? (box.style.gridTemplateRows = '1fr 1fr 1fr 1fr')
      : (box.style.gridTemplateRows = '0fr 0fr 0fr 0fr');
  }

  return (
    <div className="flex flex-col items-end w-full gap-4">
      <button className="text-center underline bg-accent3 rounded-md p-2 w-[5rem] mr-4" onClick={toggleFilters}>
        Filters
      </button>
      <div className="filterbox" id="filterbox">
        <div className="flex justify-between items-center overflow-hidden">
          <p>DBH over</p>
          <select
            name="dbhmin"
            id="dbhmin"
            className="text-dark"
            onChange={() => {
              dbhOver(trees);
            }}
          >
            {getDBHRange(trees)}
          </select>
        </div>
        <div className="flex justify-between items-center overflow-hidden">
          <p>DBH under</p>
          <select
            name="dbhmax"
            id="dbhmax"
            className="text-dark"
            onChange={() => {
              dbhUnder(trees);
            }}
          >
            {getDBHRange(trees)}
          </select>
        </div>
        <div className="flex justify-between items-center overflow-hidden">
          <p>Crown Size</p>
          <select
            name="crownsize"
            id="crownsize"
            className="text-dark"
            onChange={() => {
              crownSize(trees);
            }}
          >
            {getCrownSizes(trees)}
          </select>
        </div>
        <div className="flex justify-between items-center overflow-hidden">
          <p>Species</p>
          <select
            name="species"
            id="species"
            className="text-dark"
            onChange={() => {
              filterSpecies(trees);
            }}
          >
            {getSpecies(trees)}
          </select>
        </div>
      </div>
    </div>
  );
}
