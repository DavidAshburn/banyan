import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';
// Connects to data-controller="mapper"
export default class extends Controller {
  connect() {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';

    const coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([-74.5, 40])
      .addTo(map);

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
    }

    marker.on('dragend', onDragEnd);
  }
}
