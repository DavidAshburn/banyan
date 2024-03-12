import React, { useRef, useState, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';
import Propertyinfo from './propmap/Propertyinfo';
import Filters from './ui/Filters';

export default function Propertymap() {

    //map essentials
    mapboxgl.accessToken =
        document.getElementById('mapboxpub').innerText;
    const [property, setProperty] = useState({});
    const [client, setClient] = useState({});
    const [profile, setProfile] = useState({vehicles:[],equipment:[]});
    const [jobs, setJobs] = useState([]);


    const mapContainer = useRef(null);
    const map = useRef(null);

    const startcolor = '#219781';
    const brightcolor = '#f87954';
    const [trees, _setTrees] = useState([]);
    const treesRef = useRef(trees);
    function setTrees(list) {
        treesRef.current = list;
        _setTrees(list);
    }

    const [chosen, _setChosen] = useState([]);
    const chosenRef = useRef(chosen);
    function setChosen(list) {
        chosenRef.current = list;
        _setChosen(list);
    }
    function addtoChosen(id, chosenRef, treesRef) {
        let tree = treesRef.current.find((tree) => tree.id == id);
        let newchosen = [...chosenRef.current, tree];
        setChosen(newchosen);
    }
    function removeChosen(id, chosenRef) {
        let newchosen = [...chosenRef.current];
        let dex = newchosen.findIndex((tree)=> tree.id == id);
        newchosen.splice(dex,1);
        setChosen(newchosen);
    }

    //elements
    const [elements, _setElements] = useState({});
    const elementsRef = useRef(elements);
    function setElements(obj) {
        elementsRef.current = obj;
        _setElements(obj);
    }

    function buildElements(treedata, map, elRef, chosenRef, treesRef) {
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


        openmark.getElement().addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMark(tree.id, elRef, map, chosenRef, treesRef);
            elRef.current[tree.id].popup.addTo(map);
        });

        chosenmark.getElement().addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMark(tree.id, elRef, map, chosenRef, treesRef);
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
    function toggleMark(treeid, elRef, map, chosenRef, treesRef) {
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
        addtoChosen(treeid, chosenRef, treesRef);
        }
        elRef.current[treeid] = el;
        _setElements(elRef.current);
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
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    

    useEffect(() => {

        const pid = window.location.href.split('/').slice(-1);

        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            center: [-157.858,21.315],
            zoom: 13,
            maxZoom: 20,
            //cooperativeGestures: true,
            style: `mapbox://styles/mapbox/satellite-v9`,
        });

        fetch(`/data/proptrees?pid=` + pid)
            .then((response) => response.json())
            .then((data) => {
                setProperty(data[0]);
                setTrees(data[1]);
                setJobs(data[2]);

                buildElements(data[1], map.current, elementsRef, chosenRef, treesRef);
                setBounds(data[0], data[1], map.current);

                if(data[1].length == 0) {
                    let propertymark = new mapboxgl.Marker({
                        color: startcolor,
                    })
                        .setLngLat([data[0].longitude, data[0].latitude])
                        .addTo(map.current);
                }
                
                fetch('/data/client?cid=' + data[0].client_id)
                    .then((response) => response.json())
                    .then((data) => {
                        setClient(data.client);
                });
        });
    }, []);

    return(
        

        <div className="flex flex-col lg:grid min-h-screen grid-cols-1 grid-rows-[60dvh_1fr_1fr_1fr] lg:grid-cols-[1fr_3fr] lg:grid-rows-[3fr_1fr] gap-2">
            <div ref={mapContainer} className="min-h-[60lvh] lg:col-start-2 lg:row-start-1"></div>
            
            <div className="mainpane lg:col-start-2 lg:row-start-2">
                <p className="panetitle">Info</p>
                <div className="grid-cols-2 panecontent ">
                    <div className="grid gap-2">
                        <Propertyinfo property = {property} client={client}/>
                        <a
                            href={'/jobs/new?pid=' + property.id}
                            className="p-2 mr-2 rounded bg-light text-dark font-bold text-sm text-center w-fit justify-self-end"
                        >
                            New Job
                        </a>
                    </div>
                    <div className="pt-2">
                        <Filters trees={trees} elRef={elementsRef} map={map.current} />
                    </div>
                </div>
            </div>

            <div className="mainpane lg:col-start-1 lg:row-start-1">
                <p className="panetitle">Trees</p>
                <div id="alltrees" className="panecontent max-lg:max-h-[40svh] lg:max-h-[75svh] overflow-y-scroll scroll-theme text-dark">
                    <div className="grid grid-cols-3 px-2 text-center">
                        <p>Species</p>
                        <p>DBH</p>
                        <p>Crown</p>
                    </div>
                    {trees.map((tree,i) => 
                        <div className="grid grid-cols-3 bg-light rounded-xl p-2 text-center" 
                        key={i}
                        onMouseEnter={()=>{elementsRef.current[tree.id].popup.addTo(map.current)}}
                        onMouseLeave={()=>{elementsRef.current[tree.id].popup.remove()}}
                        >
                            <p>{ capitalize(tree.species) }</p>
                            <p>{ tree.dbh }"</p>
                            <p>{ tree.crown }</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mainpane lg:col-start-1 lg:row-start-2">
                <p className="panetitle"></p>
                <div className="panecontent">
                    {}
                </div>
            </div>

            
        </div>

    )
}