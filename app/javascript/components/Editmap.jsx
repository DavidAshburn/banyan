import React, {useState, useEffect} from "react";
import mapboxgl from 'mapbox-gl';

export default function Editmap() {
    mapboxgl.accessToken =
        document.getElementById('mapboxpub').innerText;
    const [property, setProperty] = useState({});
    const [profile, setProfile] = useState({vehicles:[],equipment:[]});

    const startcolor = '#219781';
    const brightcolor = '#f87954';
    const [trees, _setTrees] = useState([]);
    const treesRef = useRef(trees);
    function setTrees(list) {
        treesRef.current = list;
        _setTrees(list);
    }

    const [propertyMarker, setPropertyMarker] = useState(null);

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

    function addElement(tree, map, elRef, chosenRef, treesRef) {
        let telements = elRef.current;

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
        
        setElements(telements);
    }

    useEffect(() => {

        const pid = document.getElementById('pid').innerText;

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
            });
    }, []);
    return(
        <div></div>
    )
}