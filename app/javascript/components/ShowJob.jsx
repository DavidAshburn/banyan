import React, {useState, useEffect, useRef} from "react"
import InfoPanel from "./showjob/InfoPanel";
import mapboxgl from "mapbox-gl";

export default function ShowJob() {

    mapboxgl.accessToken = document.getElementById('mapboxpub').innerText;
    const [property, setProperty] = useState({});
    const mapContainer = useRef(null);
    const map = useRef(null);
    const startcolor = '#219781';
    const brightcolor = '#6ee7b7';
    const [job, setJob] = useState({})
    const [work, setWork] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [equipment, setEquipment] = useState([]);
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

    function buildElements(treedata, map, elRef, chosenRef, treesRef, work) {
        let telements = {};
        for(let tree of treedata) {
        let pop = new mapboxgl.Popup({
            anchor: 'top-left',
            closeButton: false,
        })
            .setHTML(
            `<div className='grid p-2 gap-2 w-40 font-josefin'><p>${tree.species}</p><p>${tree.dbh} DBH</p><p>${work[tree.id]}</p></div>`
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
    function sendClientInvoice(event){
        console.log('send invoice via SendGrid');
        console.log('send POST to update job invoiced and invoicedate');
    }
    function sendClientReceipt(event){
        console.log('send receipt via SendGrid');
        console.log('send POST to update job paid and paiddate');
    }
    const destroyJob = async (id)=> {

        let token = document.getElementsByName('csrf-token')[0].content;
        const response = await fetch('../jobs/'+id, {
            method: 'DELETE',
            headers: {
              'X-CSRF-Token': token,
            },
          });

        let next = '../user/dashboard';
        window.open(next, '_self');

    }

    useEffect(()=> {

        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            center: [-157.858,21.315],
            zoom: 12,
            maxZoom: 20,
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
                setVehicles(data.job.vehicles);
                setEquipment(data.job.equipment);

                buildElements(data.trees, map.current, elementsRef, chosenRef, treesRef, data.work);
                setBounds(data.property, data.trees, map.current);

            });
    },[]);

    return(
        
        <div className="grid max-lg:min-h-screen grid-cols-1 grid-rows-[60dvh_1fr_1fr_1fr] lg:h-screen lg:grid-cols-[1fr_3fr] lg:grid-rows-[3fr_1fr] gap-2">
            <div ref={mapContainer} className="lg:col-start-2 lg:row-start-1"></div>
            <div className="mainpane lg:col-start-1 lg:row-start-1">
                <p className="panetitle">Trees</p>
                <div id="jobtrees" className="panecontent max-lg:h-[20dvh] lg:max-h-[75svh] overflow-y-scroll scroll-theme">
                    <div className="grid grid-cols-3 px-2 text-center">
                    <p>Species</p>
                    <p>DBH</p>
                    <p>Work</p>
                    </div>
                    {trees.map((tree,i) => 
                        <div className="grid grid-cols-3 rounded-xl p-2 text-center text-dark bg-light" 
                        key={i}
                        onMouseEnter={()=>{elementsRef.current[tree.id].popup.addTo(map.current)}}
                        onMouseLeave={()=>{elementsRef.current[tree.id].popup.remove()}}
                        >
                            <p>{ capitalize(tree.species) }</p>
                            <p>{ tree.dbh }"</p>
                            <p>{ capitalize(work[tree.id]) }</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="mainpane">
                <p className="panetitle">Notes</p>
                <div className="panecontent">
                    <p>{job.notes}</p>
                    
                    <a href={"/pdf/job?jid=" + job.id} className="bg-stone-400 text-dark rounded-lg text-center py-2 px-4" target="_blank">
                        PDF
                    </a>
                    {job.invoiced ? <button onClick={sendClientReceipt} className="bg-stone-300 text-dark rounded-lg text-center py-2 px-4">Send Receipt</button> 
                        : <button onClick={sendClientInvoice} className="bg-stone-300 text-dark rounded-lg text-center py-2 px-4">Send Invoice</button> 
                        }
                    <button type="button" onClick={()=>{destroyJob(job.id)}} className="bg-alert text-dark rounded-lg text-center py-2 px-4">Destroy this Job</button>
                </div>
            </div>
            <div className="mainpane">
                <p className="panetitle">Info</p>
                <InfoPanel job={job} vehicles={vehicles} equipment={equipment}/>
            </div>
        </div>
    )
}