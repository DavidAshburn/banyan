import React, { useRef, useState, useEffect } from 'react';
import Filters from './ui/Filters';
import Treerow from './newjob/Treerow';
import FleetChecks from './newjob/FleetChecks';
import mapboxgl from 'mapbox-gl';

export default function Propertymap() {
  //map essentials
  mapboxgl.accessToken =
    document.getElementById('mapboxpub').innerText;
  const [property, setProperty] = useState({});
  const [trees, setTrees] = useState([]);
  const [client, setClient] = useState({});
  const [profile, setProfile] = useState({vehicles:[],equipment:[]});
  const [workoptions, setWorkOptions] = useState([]);
  const [fleet, setFleet] = useState([]);
  
  const mapContainer = useRef(null);
  const map = useRef(null);

  const startcolor = '#219781';
  const brightcolor = '#f87954';

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

  const [chosen, _setChosen] = useState([]);
  const chosenRef = useRef(chosen);
  function setChosen(list) {
    chosenRef.current = list;
    _setChosen(list);
  }
  const [elements, _setElements] = useState({});
  const elementsRef = useRef(elements);
  function setElements(obj) {
    elementsRef.current = obj;
    _setElements(obj);
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
  function updatePrice(e) {
    e.preventDefault();
    let total = 0;
    for(let child of document.getElementById('treelist').children) {
      if(child.children[2].id.includes('treeprice')) { //we do this to exclude the child that just has labels
        total += parseInt(child.children[2].value);
      }
    }
    document.getElementById('pricein').value = total;
    setPrice(total);
  }
  function updateHours(e) {
    e.preventDefault();
    let start = document.getElementById('starttime').value;
    let end = document.getElementById('endtime').value;

    let diff = Date.parse(end) - Date.parse(start);
    let hours = diff/3600000;
    let days = Math.floor(hours / 24);
    //assume 8 hour work days
    let calchours = hours - (16 * days);
    document.getElementById('hoursin').value = calchours;
    setEstHours(calchours);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let token = document.getElementsByName('csrf-token')[0].content;

    const trees = {};
    for(let child of document.getElementById('treelist').children) {
      if(child.children[2].id.includes('treeprice')) { //we do this to exclude the child that just has labels
        let id = child.dataset.treeid;
        let work = document.getElementById(`treework${id}`).value;
        let treeprice = document.getElementById(`treeprice${id}`).value;
        trees[id] = {'work' : work, 'price' : treeprice };
      }
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
      maxZoom: 20,
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
        setFleet(data.fleet);

        buildElements(data.trees, map.current, elementsRef, chosenRef);
        setBounds(data.property, data.trees, map.current);
    });
  }, []);

  return (
    <div className="grid grid-cols-[3fr_7fr] grid-rows-[80svh_10svh_70svh_1fr_2rem] lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] lg:grid-rows-[1fr_18rem] bg-stone-900">
      <div
        ref={mapContainer}
        className="max-lg:col-span-2 max-lg:row-span-2 max-lg:col-start-1 max-lg:row-start-1 lg:col-start-2 bg-stone-900"
      ></div>

      <div
        className="mainpane row-span-2 row-start-2 col-start-2 lg:row-start-1 lg:col-start-1 lg:min-h-[100svh] z-20 bg-stone-800"
        id="newjobform"
      >
        <p className="panetitle">New Job</p>
        <div className="panecontent">
          <form
            onSubmit={handleSubmit}
            className="grid gap-2 px-4 pt-4 grid-cols-2"
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
              className="text-dark rounded-lg h-[2rem] px-4"
              type="text"
              value={estimator}
              id="estimatorin"
              onChange={(e) => setEstimator(e.target.value)}
            />
            <label htmlFor="foremanin">Foreman</label>
            <input
              className="text-dark rounded-lg h-[2rem] px-4"
              type="text"
              value={foreman}
              id="foremanin"
              onChange={(e) => setForeman(e.target.value)}
            />
            <label htmlFor="notesin">Notes</label>
            <input
              className="text-dark rounded-lg h-[2rem] px-4"
              type="text"
              value={notes}
              id="notesin"
              onChange={(e) => setNotes(e.target.value)}
            />
            <label htmlFor="crewin">Crew Size</label>
            <input
              className="text-dark rounded-lg h-[2rem] px-4"
              type="number"
              value={crew_size}
              id="crewin"
              onChange={(e) => setCrewSize(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <label htmlFor="pricein">Est Hours</label>
              <button onClick={updateHours} className="bg-accent2 text-white font-bold px-2">Auto</button>
            </div>
            <input
              className="text-dark rounded-lg h-[2rem] px-4"
              type="number"
              value={est_hours}
              id="hoursin"
              onChange={(e) => setEstHours(e.target.value)}
              onFocus={updateHours}
            />
            <div className="flex justify-between items-center">
              <label htmlFor="pricein">Est Price</label>
              <button onClick={updatePrice} className="bg-accent2 text-white font-bold px-2">Auto</button>
            </div>
            <input
              className="text-dark rounded-lg h-[2rem] px-4"
              type="number"
              value={price}
              id="pricein"
              onChange={(e) => setPrice(e.target.value)}
            />
            <FleetChecks fleet={fleet} fleettype="Vehicle" />
            <FleetChecks fleet={fleet} fleettype="Equipment" />
            <button type="submit" className="col-start-2 bg-light text-dark text-center font-bold p-2 w-fit rounded-md justify-self-end">
              Make Job
            </button>
          </form>
        </div>
        <div className="grid gap-2 px-2">
          <Filters trees={trees} elRef={elementsRef} map={map.current} />
        </div>
      </div>
      <div
        className="grid max-lg:col-span-full max-lg:col-start-1 lg:flex lg:flex-col justify-start lg:col-start-2 lg:row-start-2 overflow-y-scroll scroll-theme p-2 pt-4 gap-4 bg-stone-900"
        id="treelist"
      >
          <div className="grid grid-cols-4 gap-2 p-2 bg-stone-900 text-light font-bold min-h-8 items-center -my-2 pl-4">
            <p>Species</p>
            <p>DBH</p>
            <p>Price</p>
            <p>Work</p>
          </div>
          {chosenRef.current.map((tree, i)=> 
          <Treerow key={i} index={i} tree={tree} elRef={elementsRef} map={map} workoptions={workoptions} updatePrice={updatePrice}/>
          )}
      </div>
    </div>
  );
}
