import React, { useRef, useState, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';
import Propertyinfo from './ui/Propertyinfo';

mapboxgl.accessToken = 'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';




export default function Propertymap() {

    const [property, setProperty] = useState({});
    const [trees, setTrees] = useState([]);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(9);
    const [markers, setMarkers] = useState([]);
    const [popups, setPopups] = useState([]);
    const [client, setClient] = useState({});

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
        setPopups(tpopups);
        return tpopups;
    }
    function setMarkersAndBounds(treedata, center, startcolor, map, popups) {
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
            
            //add listeners to show/hidePopup on hover
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
    function filterMarkers(trees, markers) {
        markers.each((item, i) => {
            if(!bigCheck(trees[i])) item.remove();
        })
    }
    function resetMarkers(markers, map) {
        for(let item of markers) {
            item.addTo(map);
        }
    }
    function bigCheck(tree) {
        if(tree.dbh > 6) return true;
        return false;
    }

    useEffect(() => {

        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            center: [-157.858,21.315],
            zoom: zoom,
            //cooperativeGestures: true,
            style: `mapbox://styles/mapbox/satellite-v9`,
        });

        fetch(`/data/proptrees?pid=1`)
            .then((response) => response.json())
            .then((data) => {
                setProperty(data[0]);
                setTrees(data[1]);
                setZoom(15);
                let tpopups = initPopups(data[1]);
                setMarkersAndBounds(data[1], [data[0].longitude, data[0].latitude], '#07a7cb', map.current, tpopups);
                
                fetch('/data/client?cid=' + data[0].client_id)
                    .then((response) => response.json())
                    .then((data) => {
                        setClient(data.client);
                        });
        });

        
            
    });

    return(
        <div className="grid grid-rows-[200px_1fr] md:grid-cols-[1fr_4fr] md:grid-rows-1">
            <div className="flex flex-col justify-between gap-2 p-2 bg-dark text-light">
                <div className="grid gap-2 h-fit">
                    <button className="underline" onClick={() => {filterMarkers(trees, markers)}}>Filter</button>
                    <button className="underline" onClick={() => {resetMarkers(marksers,map.current)}}>Reset</button>
                </div>
                <div className="self-end">
                    <Propertyinfo property = {property} client={client}/>
                </div>
            </div>
            <div className="h-[100svh] w-full" ref={mapContainer}></div>
        </div>
            
    )
}