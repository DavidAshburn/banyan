import React, { useRef, useState, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';


export default function Propertymap() {

    const [property, setProperty] = useState({});
    const [trees, setTrees] = useState([]);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [longitude, setLongitude] = useState()

    useEffect(() => {
        fetch(`/data/proptrees`)
          .then((response) => response.json())
          .then((data) => {
            setProperty(data[0]);
            setTrees(data[1]);
            initializeMap(data[0],data[1]);
            });
    });

    

    return(
        <div className="h-[100svh]">

        </div>
    )
}