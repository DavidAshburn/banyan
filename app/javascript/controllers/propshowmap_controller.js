import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';

// Connects to data-controller="propshowmap"
export default class extends Controller {
  connect() {
    let regex = /=>/g;
    let property_data = document
      .getElementById('propertydata')
      .innerText.replace(regex, ':');

    this.property = JSON.parse(property_data);

    const accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';

    this.mapboxInit(accesstoken, [
      this.property.longitude,
      this.property.latitude,
    ]);

    let marker = new mapboxgl.Marker({
      color: '#fbbf24',
    })
      .setLngLat([this.property.longitude, this.property.latitude])
      .addTo(this.map);
    /*
    if (this.tree_index > 0)
      this.setMarkersAndBounds(treedata);
    */
  }

  mapboxInit(token, center) {
    const honolulu = [-157.858093, 21.315603];
    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map({
      container: 'propshowmap', // container ID
      center: center, // starting position [lng, lat]
      zoom: 17, // starting zoom
      //cooperativeGestures: true,
      style: `mapbox://styles/mapbox/satellite-v9`,
    });
  }
}
