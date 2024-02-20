import React, { useRef, useState, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';
import Propertyinfo from './propmap/Propertyinfo';
import Filters from './propmap/Filters';

export default function Propertymap() {

    //map essentials
    mapboxgl.accessToken =
        document.getElementById('mapboxpub').innerText;
    const [property, setProperty] = useState({});
    const [client, setClient] = useState({});
    const [profile, setProfile] = useState({vehicles:[],equipment:[]});

    const mapContainer = useRef(null);
    const map = useRef(null);

    const [startcolor, setStartColor] = useState('#07a7cb');
    const [brightcolor, setBrightColor] = useState('#6ee7b7');
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
        map.setMaxZoom(20);
      }


    useEffect(() => {

        const pid = window.location.href.split('/').slice(-1);

        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            center: [-157.858,21.315],
            zoom: 15,
            //cooperativeGestures: true,
            style: `mapbox://styles/mapbox/satellite-v9`,
        });

        fetch(`/data/proptrees?pid=` + pid)
            .then((response) => response.json())
            .then((data) => {
                setProperty(data[0]);
                setTrees(data[1]);

                buildElements(data[1], map.current, elementsRef, chosenRef, treesRef);
                setBounds(data[0], data[1], map.current);
                
                fetch('/data/client?cid=' + data[0].client_id)
                    .then((response) => response.json())
                    .then((data) => {
                        setClient(data.client);
                });
        });
    }, []);

    return(
        <div className="grid grid-rows-[200px_1fr] md:grid-cols-[1fr_4fr] md:grid-rows-1">
            <div className="flex flex-col justify-between gap-2 p-2 bg-dark text-light">
                <div className="grid gap-2">
                    <Filters trees={trees} elRef={elementsRef} map={map.current} />
                    <a
                        href={'/jobs/new?pid=' + property.id}
                        className="p-2 rounded bg-light text-dark font-bold text-sm text-center w-fit"
                    >
                        New Job
                    </a>
                </div>
                <div className="self-end">
                    <Propertyinfo property = {property} client={client}/>
                </div>
            </div>
            <div className="h-[100svh] w-full" ref={mapContainer}></div>
        </div>
            
    )
}