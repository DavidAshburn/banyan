import React, { useRef, useState, useEffect } from 'react';
import Filters from './propmap/Filters';
import Treerow from './ui/Treerow';
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
  const [client, setClient] = useState({});
  const [profile, setProfile] = useState({vehicles:[],equipment:[]});
  const [workoptions, setWorkOptions] = useState([]);
  
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [startcolor, setStartColor] = useState('#07a7cb');
  const [brightcolor, setBrightColor] = useState('#6ee7b7');

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

  //chosenRef and elementsRef are needed as pointers to markerstate that dont get stale on DOM listeners that dont re-render
  //treedata for current selection
  // [Tree,Tree,...]
  const [chosen, _setChosen] = useState([]);
  const chosenRef = useRef(chosen);
  function setChosen(list) {
    chosenRef.current = list;
    _setChosen(list);
  }
  function addtoChosen(chosenRef, tree) {
    let newchosen = [...chosenRef.current, tree];
    setChosen(newchosen);
  }
  function removeChosen(id, chosenRef) {
    let newchosen = [...chosenRef.current];
    let dex = newchosen.findIndex((tree)=> tree.id == id);
    newchosen.splice(dex,1);
    setChosen(newchosen);
  }

  //marker and popup collection for all trees
  /* 
    { id: {open: mapboxgl.Marker, chosen: mapboxgl.Marker, popup: mapboxgl.Popup, selected: bool},
      id: {open: mapboxgl.Marker, chosen: mapboxgl.Marker, popup: mapboxgl.Popup, selected: bool},
      ...,    
    } 
  */
  const [elements, _setElements] = useState({});
  const elementsRef = useRef(elements);
  function setElements(obj) {
    elementsRef.current = obj;
    _setElements(obj);
  }

  function buildElements(treedata, map, elRef, chosenRef) {
    let telements = {};
    for(let tree of treedata) {
      let pop = new mapboxgl.Popup({
        anchor: 'top-left',
        closeButton: false,
      })
        .setHTML(
          `<div className='grid p-2 gap-2 w-40 font-josefin'><p>${tree.species}</p><p>${tree.dbh} DBH</p><p>${tree.crown} crown</p></div>`
        )
        .setLngLat([tree.longitude, tree.latitude]);
      
      let openmark = new mapboxgl.Marker({
        color: startcolor,
      })
        .setLngLat([tree.longitude, tree.latitude])
        .addTo(map);

      let chosenmark = new mapboxgl.Marker({
        color: brightcolor,
      })
        .setLngLat([tree.longitude, tree.latitude]);


      openmark.getElement().addEventListener('click', () => {
        toggleMark(tree.id, elRef, map, chosenRef, tree);
      });
      openmark.getElement().addEventListener('mouseenter', () => {
        elRef.current[tree.id].popup.addTo(map);
      });
      openmark.getElement().addEventListener('mouseleave', () => {
        elRef.current[tree.id].popup.remove();
      });

      chosenmark.getElement().addEventListener('click', () => {
        toggleMark(tree.id, elRef, map, chosenRef, tree);
      });
      chosenmark.getElement().addEventListener('mouseenter', () => {
        elRef.current[tree.id].popup.addTo(map);
      });
      chosenmark.getElement().addEventListener('mouseleave', () => {
        elRef.current[tree.id].popup.remove();
      });

      telements[tree.id] = {
        open:openmark,
        chosen:chosenmark,
        popup:pop,
        selected:false,
      }
    }
    setElements(telements);
  }

  function toggleMark(treeid, elRef, map, chosenRef, tree) {
    let el = elRef.current[treeid];
    if(el.selected) {
      el.chosen.remove();
      el.selected = false;
      el.open.addTo(map);
      removeChosen(treeid, chosenRef);
    } else {
      el.open.remove();
      el.chosen.addTo(map);
      el.selected = true;
      addtoChosen(chosenRef, tree);
    }
    
    elRef.current[treeid] = el;
    _setElements(elRef.current);
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
    const vehicles = [];
    for(let child of document.getElementById('vehiclechecks').children) {
      let check = child.firstElementChild;
      if(check.checked) vehicles.push(check.value)
    }

    const equipment = [];
    for(let child of document.getElementById('equipmentchecks').children) {
      let check = child.firstElementChild;
      if(check.checked) equipment.push(check.value)
    }

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

    //console.log(postData);
    
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
      window.open(next, '_self');
    } else {
      console.log('POST error on NewJob');
    }
    
  };

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [-157.858, 21.315],
      zoom: 12,
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
        setWorkOptions(data.profile.worktypes);

        buildElements(data.trees, map.current, elementsRef, chosenRef);
        setBounds(data.property, data.trees, map.current);
    });
  }, []);

  function setBounds(property, trees, map) {
    let baseLL = new mapboxgl.LngLat(property.longitude, property.latitude);
    //mapbounds setting
    const bounds = new mapboxgl.LngLatBounds(
      baseLL,
      baseLL
    );
    for (let item of trees) {
      let thisll = new mapboxgl.LngLat(item.longitude, item.latitude);
      bounds.extend(thisll);
    }
    map.fitBounds(bounds, { padding: 100 });
    map.setMaxZoom(19);
  }

  return (
    <div className="grid grid-cols-[3fr_7fr] grid-rows-[80svh_10svh_60svh_2rem] lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] lg:grid-rows-[1fr_12rem] bg-light">
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
              className="text-dark rounded-lg h-[2rem] col-span-2"
              type="datetime-local"
              value={start}
              id="starttime"
              onChange={(e) => setStart(e.target.value)}
            />
            <label htmlFor="endin">End</label>
            <input
              className="text-dark rounded-lg h-[2rem] col-span-2"
              type="datetime-local"
              value={end}
              id="endtime"
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
            <div className="col-span-full">
              <label htmlFor="vehicles">Vehicles</label>
              <div className="grid grid-cols-2" id="vehiclechecks">
                {profile.vehicles.map((vehicle, i) => 
                  <div className="flex justify-between items-center text-end p-2 bg-green-300 text-dark" key={i}>
                    <input type="checkbox" value={vehicle}/>
                    <p>{vehicle}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="equipment">Equipment</label>
              <div className="grid grid-cols-2" id="equipmentchecks">
                {profile.equipment.map((equip, i) => 
                  <div className="flex justify-between items-center text-end p-2 bg-green-300 text-dark" key={i}>
                    <input type="checkbox" value={equip}/>
                    <p>{equip}</p>
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className="col-start-2 bg-dark text-light font-bold p-2 rounded-md">
              Make Job
            </button>
          </form>
        </div>
        <div className="panecontent">
          <Filters trees={trees} elRef={elementsRef} map={map.current} />
        </div>
      </div>
      <div
        className="hidden lg:flex lg:flex-col justify-start lg:col-start-2 lg:row-start-2 overflow-scroll p-2 gap-4 bg-emerald-200"
        id="treelist"
      >
          {
            chosenRef.current.map((tree, i)=> <Treerow key={i} tree={tree} elRef={elementsRef} map={map} workoptions={workoptions}/>)
          }
      </div>
    </div>
  );
}
