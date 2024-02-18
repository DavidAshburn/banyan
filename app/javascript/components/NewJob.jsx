import React, { useRef, useState, useEffect } from 'react';
import Filters from './propmap/Filters';
import Treelist from './newjob/Treelist';
import mapboxgl from 'mapbox-gl';

//mapboxgl.accessToken = 'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Propertymap() {
  //map essentials
  mapboxgl.accessToken =
    document.getElementById('mapboxpub').innerText;
  const [property, setProperty] = useState({});
  const [trees, setTrees] = useState([]);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(9);
  const [markers, setMarkers] = useState([]);
  
  const [client, setClient] = useState({});
  //marker toggling
  const [startcolor, setStartColor] = useState('#07a7cb');
  const [brightcolor, setBrightColor] = useState('#6ee7b7');
  const [popups, setPopups] = useState([]);

  //form state
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [estimator, setEstimator] = useState('');
  const [foreman, setForeman] = useState('');
  const [notes, setNotes] = useState('');
  const [crew_size, setCrewSize] = useState(0);
  const [est_hours, setEstHours] = useState(0);
  const [price, setPrice] = useState(0);
  const property_id = document.getElementById('pid').innerText;
  const user_id = document.getElementById('uid').innerText;
  const [profile, setProfile] = useState({});
  const [chosentrees, setChosenTrees] = useState([]);

  function initPopups(trees) {
    let tpopups = [];
    for (let item of trees) {
      let newpop = new mapboxgl.Popup({
        anchor: 'top-left',
        closeButton: false,
      })
        .setHTML(
          `<div className='grid p-2 gap-2 w-40 font-josefin'><p>${item.species}</p><p>${item.dbh} DBH</p><p>${item.crown} crown</p></div>`
        )
        .setLngLat([item.longitude, item.latitude]);

      tpopups.push(newpop);
    }
    return tpopups;
  }

  function setMarkersAndBounds(
    treedata,
    center,
    startcolor,
    brightcolor,
    map,
    popups
  ) {
    //mapbounds collection
    let features = [{ lon: center[0], lat: center[1] }];
    let index = 0;
    let tmarkers = [];
    for (let item of treedata) {
      let tindex = index;
      let marker = new mapboxgl.Marker({
        color: startcolor,
      })
        .setLngLat([item.longitude, item.latitude])
        .addTo(map);

      marker.getElement().addEventListener('click', () => {
        toggleMarker(marker, startcolor, brightcolor, map, item.id, chosentrees, treedata, popups);
      });
      marker.getElement().addEventListener('mouseenter', () => {
        popups[tindex].addTo(map);
      });
      marker.getElement().addEventListener('mouseleave', () => {
        popups[tindex].remove();
      });

      features.push({ lon: item.longitude, lat: item.latitude });
      tmarkers.push(marker);
      index++;
    }
    setMarkers(tmarkers);

    //mapbounds setting
    const bounds = new mapboxgl.LngLatBounds(
      features[0],
      features[0]
    );
    for (let item of features) {
      bounds.extend(item);
    }
    map.fitBounds(bounds, { padding: 100 });
    map.setMaxZoom(17);
    map.setMaxZoom(22);
  }
  function resetMarkers(markers, map) {
    for (let item of markers) {
      item.addTo(map);
    }
  }
  function toggleMarker(marker, start, bright, map, treeId, chosentrees, treedata, popups) {
    //base my action on the current color
    let nextcolor;
    let addremove;
    if (marker._color == start) {
      nextcolor = bright;
      addremove = true;
    } else {
      nextcolor = start;
      addremove = false;
    }

    if (addremove) {
      addToTreeList(treeId, chosentrees);
    } else {
      removeFromTreeList(treeId, chosentrees);
    }

    //swap out the marker for a new one in the alternate color
    let backup = marker;
    marker.remove;

    let newmarker = new mapboxgl.Marker({
      color: nextcolor,
    })
      .setLngLat(backup.getLngLat())
      .addTo(map);

    let tindex = -1;
    for(let i = 0; i < treedata.length; i++) {
      if(treedata[i].id == treeId) tindex = i; 
    }
    //new toggleMarker event listener for the new Marker
    newmarker.getElement().addEventListener('click', () => {
      toggleMarker(newmarker, start, bright, map, treeId, chosentrees, treedata, popups);
    });
    
    newmarker.getElement().addEventListener('mouseenter', () => {
      popups[tindex].addTo(map);
    });
    newmarker.getElement().addEventListener('mouseleave', () => {
      popups[tindex].remove();
    });
    
  }

  function addToTreeList(treeid, chosentrees) {
    let t = chosentrees;
    t.push(treeid);
    setChosenTrees(t);
  }
  function removeFromTreeList(treeid, chosentrees) {
    let i = chosentrees.findIndex((el) => el == treeid);
    let t = chosentrees.splice(i, 1);
    setChosenTrees(t);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let token = document.getElementsByName('csrf-token')[0].content;

    const trees = {};
    for(let child of document.getElementById('treelist').children) {
      let id = child.dataset.treeid;
      let work = document.getElementById(`treework${id}`).value;
      trees[id] = work;
    }
    const vehicles = ['F150'];
    const equipment = ['Grinder'];

    const postData = {
      start,
      end,
      estimator,
      foreman,
      trees,
      notes,
      crew_size,
      est_hours,
      price,
      user_id,
      property_id,
      vehicles,
      equipment,
    };

    console.log(postData);
    /*
    const response = await fetch('/jobs.json', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      let next = '../user/dashboard';
      window.open(next);
    } else {
      console.log('error');
    }
    */
  };

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [-157.858, 21.315],
      zoom: zoom,
      //cooperativeGestures: true,
      style: `mapbox://styles/mapbox/satellite-v9`,
    });

    fetch(`/data/newjob?pid=` + property_id)
      .then((response) => response.json())
      .then((data) => {
        setProperty(data.property);
        setTrees(data.trees);
        setClient(data.client);
        setProfile(data.profile);
        let tpopups = initPopups(data.trees);
        setPopups(tpopups);
        setMarkersAndBounds(
          data.trees,
          [data.property.longitude, data.property.latitude],
          startcolor,
          brightcolor,
          map.current,
          tpopups
        );
    });
  }, []);

  return (
    <div className="grid grid-cols-[3fr_7fr] grid-rows-[80svh_10svh_60svh_2rem] lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] lg:grid-rows-[2fr_1fr] bg-light">
      <div
        ref={mapContainer}
        className="max-lg:col-span-2 max-lg:row-span-2 max-lg:col-start-1 max-lg:row-start-1 lg:col-start-2 bg-accent2"
      ></div>
      <div
        className="mainpane row-span-2 row-start-2 col-start-2 lg:row-start-1 lg:col-start-1 lg:min-h-[100svh] z-20"
        id="newjobform"
      >
        <p className="panetitle">New Job</p>
        <div className="panecontent">
          <form
            onSubmit={handleSubmit}
            className="grid gap-2 p-4 grid-cols-2"
          >
            <label htmlFor="startin">Start Time</label>
            <input
              className="text-dark rounded-lg h-[2rem]"
              type="datetime-local"
              value={start}
              id="text"
              onChange={(e) => setStart(e.target.value)}
            />
            <label htmlFor="endin">End</label>
            <input
              className="text-dark rounded-lg h-[2rem]"
              type="datetime-local"
              value={end}
              id="text"
              onChange={(e) => setEnd(e.target.value)}
            />
            <label htmlFor="estimatorin">Estimator</label>
            <input
              className="text-dark rounded-lg h-[2rem]"
              type="text"
              value={estimator}
              id="estimatorin"
              onChange={(e) => setEstimator(e.target.value)}
            />
            <label htmlFor="foremanin">Foreman</label>
            <input
              className="text-dark rounded-lg h-[2rem]"
              type="text"
              value={foreman}
              id="foremanin"
              onChange={(e) => setForeman(e.target.value)}
            />
            <label htmlFor="notesin">Notes</label>
            <input
              className="text-dark rounded-lg h-[2rem]"
              type="text"
              value={notes}
              id="notesin"
              onChange={(e) => setNotes(e.target.value)}
            />
            <label htmlFor="crewin">Crew Size</label>
            <input
              className="text-dark rounded-lg h-[2rem]"
              type="number"
              value={crew_size}
              id="crewin"
              onChange={(e) => setCrewSize(e.target.value)}
            />
            <label htmlFor="hoursin">Est Hours</label>
            <input
              className="text-dark rounded-lg h-[2rem]"
              type="number"
              value={est_hours}
              id="hoursin"
              onChange={(e) => setEstHours(e.target.value)}
            />
            <label htmlFor="pricein">Est Price</label>
            <input
              className="text-dark rounded-lg h-[2rem]"
              type="number"
              value={price}
              id="pricein"
              onChange={(e) => setPrice(e.target.value)}
            />
            <button type="submit" className="col-start-2">
              Make Job
            </button>
          </form>
        </div>
        <div className="panecontent">
          <Filters
            trees={trees}
            markers={markers}
            map={map.current}
          />
        </div>
      </div>
      <div
        className="hidden lg:grid lg:col-start-2 lg:row-start-2 overflow-scroll bg-slate-100"
        id="treelist"
      >
        <Treelist trees={chosentrees} workoptions={profile.worktypes}/>
      </div>
    </div>
  );
}
