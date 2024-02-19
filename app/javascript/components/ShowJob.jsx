import React, {useState, useEffect, useRef} from "react"
import mapboxgl from "mapbox-gl";

export default function ShowJob() {

    mapboxgl.accessToken = document.getElementById('mapboxpub').innerText;
    const [property, setProperty] = useState({});
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(9);
    const [markers, setMarkers] = useState([]);
    const [popups, setPopups] = useState([]);
    const [startcolor, setStartColor] = useState('#07a7cb');

    const [job, setJob] = useState({})
    const [trees, setTrees] = useState([]);
    const [work, setWork] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [equipment, setEquipment] = useState([]);

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
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
        map,
        popups) {
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

            marker.getElement().addEventListener('mouseenter', () => {
                popups[tindex].addTo(map);
            });
            marker.getElement().addEventListener('mouseleave', () => {
                popups[tindex].remove();
            });
        
            //build mapbounds collection
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
    
        if(features.length == 1) {
          map.setZoom(8);
        }
    }
    
    function getlocalTime(datetime) {
        console.log(datetime);
    
        let input = new Date(datetime);
        return new Date(input.getTime()).toLocaleString()
    }

    function destroyJob(id) {
        console.log('tbw');
    }

    useEffect(()=> {

        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            center: [-157.858,21.315],
            zoom: zoom,
            //cooperativeGestures: true,
            style: `mapbox://styles/mapbox/satellite-v9`,
        });

        let jid = document.getElementById('jobid').innerText;
        fetch(`/data/jobtrees?jid=` + jid)
            .then((response) => response.json())
            .then((data) => {
                setTrees(data.trees);
                setProperty(data.property);
                setWork(data.work);
                setJob(data.job);
                let tpopups = initPopups(data.trees);
                setPopups(tpopups);
                setMarkersAndBounds(data.trees, [data.property.longitude, data.property.latitude], startcolor, map.current, tpopups);
            });
    },[]);

    return(
        
        <div className="grid max-lg:min-h-screen grid-cols-1 grid-rows-[60dvh_1fr_1fr_1fr] lg:h-screen lg:grid-cols-[1fr_3fr] lg:grid-rows-[3fr_1fr] gap-2">
            <div ref={mapContainer} className="lg:col-start-2 lg:row-start-1"></div>
            <div className="mainpane lg:col-start-1 lg:row-start-1">
                <p className="panetitle">Trees</p>
                <div id="jobtrees" className="panecontent max-lg:h-[20dvh] lg:max-h-[75svh] overflow-scroll">
                    <div className="grid grid-cols-3 px-2 text-center">
                    <p>Species</p>
                    <p>DBH</p>
                    <p>Crown</p>
                    </div>
                    {trees.map((tree,i) => 
                        <div className="grid grid-cols-3 bg-dull rounded-xl p-2 text-center" key={i}>
                            <p>{ capitalize(tree.species) }</p>
                            <p>{ tree.dbh }"</p>
                            <p>{ capitalize(tree.crown) }</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="mainpane">
                <p className="panetitle">Notes</p>
                <div className="panecontent">
                    <p>{job.notes}</p>
                </div>
            </div>
            <div className="mainpane">
                <p className="panetitle">Info</p>
                <div className="grid-cols-2 md:grid-cols-4 panecontent">
                    <div className="grid grid-cols-[1fr_4fr] items-center col-span-full">
                    <p>Start:</p>
                    <p>{getlocalTime(job.start)}</p>
                    </div>
                    <div className="grid grid-cols-[1fr_4fr] items-center col-span-full">
                    <p>End: </p>
                    <p>{getlocalTime(job.end)}</p>
                    </div>
                    <div className="flex gap-4">
                    <p>Foreman: </p>
                    <p>{ job.foreman }</p>
                    </div>
                    <div className="flex gap-4">
                    <p>Estimator: </p>
                    <p>{ job.estimator }</p>
                    </div>
                    <div className="flex gap-4">
                    <p>Crew Size: </p>
                    <p>{ job.crew_size }</p>
                    </div>
                    <div className="flex gap-4">
                    <p>Est Hours: </p>
                    <p>{ job.est_hours }</p>
                    </div>
                    <div className="flex gap-4">
                    <p>Price: </p>
                    <p>${ job.price }</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p className="col-span-full text-center">Vehicles</p>
                        {vehicles.map((vehicle,i) => 
                            <p key={i}>{vehicle}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p className="col-span-full text-center">Equipment</p>
                        {equipment.map((equip,i) => 
                            <p key={i}>{equip}</p>
                        )}
                    </div>
                    <button type="button" onClick={()=>{destroyJob(job.id)}}>Destroy this Job</button>
                </div>
            </div>
        </div>
    )
}