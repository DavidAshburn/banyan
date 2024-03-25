import React, {useState, useEffect, useRef} from "react";
import mapboxgl, { Map } from 'mapbox-gl';
import ZoneChecks from "./editmap/ZoneChecks";

export default function Editmap() {
    mapboxgl.accessToken =
        document.getElementById('mapboxpub').innerText;
    const [property, setProperty] = useState({});
    const [profile, setProfile] = useState({vehicles:[],equipment:[]});

    const startcolor = '#219781';
    const [trees, setTrees] = useState([]);

    const mapContainer = useRef(null);
    const map = useRef(null);
    const formmodal = useRef(null);
    const zonemodal = useRef(null);

    //elements
    const [elements, _setElements] = useState({});
    const elementsRef = useRef(elements);
    function setElements(obj) {
        elementsRef.current = obj;
        _setElements(obj);
    }

    function buildElements(treedata, map, elRef) {
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
        
        let treemarker = new mapboxgl.Marker({
            color: startcolor,
        })
            .setLngLat([tree.longitude, tree.latitude])
            .addTo(map);

        treemarker.getElement().addEventListener('mouseenter', () => {
            elRef.current[tree.id].popup.addTo(map);
        });
        treemarker.getElement().addEventListener('mouseleave', () => {
            elRef.current[tree.id].popup.remove();
        });

        telements[tree.id] = {
            tree:treemarker,
            popup:pop,
        }
        }
        setElements(telements);
    }
    function addElement(tree, map, elRef) {
        let telements = elRef.current;

        let pop = new mapboxgl.Popup({
            anchor: 'top-left',
            closeButton: false,
        })
            .setHTML(
            `<div className='grid p-2 gap-2 w-40 font-josefin'><p>${tree.species}</p><p>${tree.dbh} DBH</p><p>${tree.crown} crown</p></div>`
            )
            .setLngLat([tree.longitude, tree.latitude]);
        
        let treemarker = new mapboxgl.Marker({
            color: startcolor,
        })
            .setLngLat([tree.longitude, tree.latitude])
            .addTo(map);

        treemarker.getElement().addEventListener('mouseenter', () => {
            elRef.current[tree.id].popup.addTo(map);
        });
        treemarker.getElement().addEventListener('mouseleave', () => {
            elRef.current[tree.id].popup.remove();
        });


        telements[tree.id] = {
            tree:treemarker,
            popup:pop,
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
    function openTreeModal(e){
        document.getElementById('treeform').showModal();
    }
    function openZoneModal(e){
        document.getElementById('zoneform').showModal();
    }
    const addTree = async (event) => {
        const token = document.getElementsByName('csrf-token')[0].content;
        const center = map.current.getCenter();
        let zonelist = [];
        for(let frame of document.getElementById('treezones').children) {
            if(frame.firstChild.checked) zonelist.push(frame.lastChild.innerText);
        };
        const newtree = {
            "tree": {
                "longitude": center.lng,
                "latitude": center.lat,
                "species": document.getElementById("speciesin").value,
                "dbh": document.getElementById("dbhin").value,
                "crown": document.getElementById("crownin").value,
                "notes": document.getElementById("notesin").value,
                "zones": zonelist,
                "property_id": property.id
            }
        }
        
        fetch('/trees.json', {
            method: 'POST',
            headers: {
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newtree),
        });

        addElement(newtree.tree, map.current, elementsRef);
        document.getElementById('treeform').close();
    }

    const addZone = async (event) => {
        const token = document.getElementsByName('csrf-token')[0].content;
        const zname = document.getElementById('zonenamein').value;

        fetch('/edit/addzone?zname=' + zname + '&pid=' + property.id, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': token,
              }
        }).then((response) => {
            if(response.ok) {
                fetch('/properties/' + property.id + '.json')
                .then((response) => response.json())
                .then((data) => {
                    setProperty(data);
                })
            }
        });

        document.getElementById('zonenamein').value = "";
        document.getElementById('zoneform').close();
    }

    function removeZone(zonename) {
        const token = document.getElementsByName('csrf-token')[0].content;
        fetch('/edit/removezone?zname=' + zonename + '&pid=' + property.id, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': token,
            }
        }).then((response) => {
            if(response.ok) {
                fetch('/properties/' + property.id + '.json')
                .then((response) => response.json())
                .then((data) => {
                    setProperty(data);
                })
            }
        })
    }

    useEffect(() => {

        const pid = document.getElementById('pid').innerText;

        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            center: [-157.858,21.315],
            zoom: 15,
            maxZoom: 20,
            //cooperativeGestures: true,
            style: `mapbox://styles/mapbox/satellite-v9`,
        });

        fetch(`/data/proptrees?pid=` + pid)
            .then((response) => response.json())
            .then((data) => {
                setProperty(data.property);
                setTrees(data.trees);

                buildElements(data.trees, map.current, elementsRef);
                setBounds(data.property, data.trees, map.current);

                if(data.trees.length == 0) {
                    let propertymark = new mapboxgl.Marker({
                        color: startcolor,
                    })
                        .setLngLat([data.property.longitude, data.property.latitude])
                        .addTo(map.current);
                }
            });
    }, []);
    return(
        <div className="grid min-h-[100lvh] mesh1">
            <div className="grid h-[90svh] border border-red-500 relative">
                <div ref={mapContainer} className="min-h-[60lvh]"></div>
                <div className="w-8 h-8 border-2 rounded-full abs-center border-light" id="crosshair"></div>
                <button className="w-fit h-12 px-4 border-2 rounded-full abs-br-corner border-accent bg-accent2 text-light text-xl font-bold" onClick={openTreeModal}>Add Tree</button>
                <button className="w-fit h-12 px-4 border-2 rounded-full abs-bl-corner border-accent bg-accent2 text-light text-xl font-bold" onClick={openZoneModal}>Tree Zones</button>
            </div>
            <div className="flex items-center justify-evenly h-[10svh] text-light px-8 py-4">
                <a
                    href={'/properties/' + property.id}
                    className="text-center p-2 underline"
                    >
                    {property.address}
                </a>
                <a
                    href={'/jobs/new?pid=' + property.id}
                    className="p-2 mr-2 rounded bg-light text-dark font-bold text-sm text-center w-fit h-fit"
                >
                    New Job
                </a>
            </div>
            <dialog id="treeform" ref={formmodal}>
                <div className="grid gap-2 p-4 w-fit h-fit bg-dark">
                    <label htmlFor="speciesin" className="text-center p-2 text-light">Species</label>
                    <input type="text" name="species" id="speciesin"/>
                    <label htmlFor="dbhin" className="text-center p-2 text-light">Trunk Diameter</label>
                    <input type="text" name="dbh" id="dbhin"/>
                    <label htmlFor="crownin" className="text-center p-2 text-light">Crown</label>
                    <input type="text" name="crown" id="crownin"/>
                    <label className="text-center p-2 text-light">Zone</label>
                    <ZoneChecks property={property} />
                    <label htmlFor="notesin" className="text-center p-2 text-light">Notes</label>
                    <input type="text" name="notes" id="notesin"/>
                    <button onClick={addTree} className="lightbutton">Save Tree</button>
                    <button onClick={()=>formmodal.current.close()} className="lightbutton">Close</button>
                </div>
            </dialog>
            <dialog id="zoneform" ref={zonemodal}>
                <div className="grid gap-2 p-4 w-fit h-fit bg-dark">
                    <div className="grid gap-2 p-2 text-light">
                        {property.zones && property.zones.map((zone) => (
                            <div key={zone}>
                                <div className="flex justify-between items-center pl-4 gap-2 bg-light text-dark rounded-full max-sm:min-w-20 sm:w-full tagpair-gradient h-fit">
                                    <p>{zone}</p>
                                    <button onClick={()=>removeZone(zone)} className="rounded-full h-[1.5rem] w-[1.5rem] bg-cross -mr-[2px]"></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <label htmlFor="zonenamein" className="text-center p-2 text-light">Zone Name</label>
                    <input type="text" name="zonenamein" id="zonenamein"/>
                    <button onClick={addZone} className="lightbutton">Add Zone</button>
                    <button onClick={()=>zonemodal.current.close()} className="lightbutton">Close</button>
                </div>
            </dialog>
        </div>
    )
}