import React, { useRef, useState, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';




export default function Propertymap() {

    const [property, setProperty] = useState({});
    const [trees, setTrees] = useState([]);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(9);
    const [popups, setPopups] = useState([]);

    function initPopups(trees) {
        let tpopups = [];
        for (let item of trees) {
          let newpop = new mapboxgl.Popup({
            anchor: 'top-left',
            closeButton: false,
          })
            .setHTML(
              `<div className='grid p-2 gap-2 w-40'><p>${item.species}</p><p>${item.dbh} DBH</p><p>${item.crown} crown</p></div>`
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
        for (let item of treedata) {
            let tindex = index;
            let marker = new mapboxgl.Marker({
                color: startcolor,
            })
                .setLngLat([item.longitude, item.latitude])
                .setPopup(
                new mapboxgl.Popup().setHTML(
                    `<div className='grid p-2 gap-2 w-40'><p>${item.species}</p><p>${item.dbh} DBH</p><p>${item.crown} crown</p></div>`
                )
                )
                .addTo(map);
            
            //add listeners to show/hidePopup on hover
            marker.getElement().addEventListener('mouseenter', () => {
                popups[tindex].addTo(map);
            });
            marker.getElement().addEventListener('mouseleave', () => {
                popups[tindex].remove();
            });
    
            features.push({ lon: item.longitude, lat: item.latitude });
            index++;
        }
    
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
            });
            
    });

    return(
        <div className="h-[100svh] w-full" ref={mapContainer}>

        </div>
    )
}