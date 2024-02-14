import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';

export default class extends Controller {
  static targets = [];

  connect() {
    const accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';
    this.mapboxInit(accesstoken);

    fetch('/data/jobsdash')
      .then((response) => response.json())
      .then((jobsites) => {
        if(jobsites.length > 0) {
          this.map.setCenter(this.centerOf(jobsites));
          this.setMarkersAndBounds(jobsites);
        }
      });

  }
  mapboxInit(token) {
    const honolulu = [-157.858093, 21.315603];
    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map({
      container: 'jobsmap', // container ID
      center: honolulu, // starting position [lng, lat]
      zoom: 9, // starting zoom
      //cooperativeGestures: true,
      style: `mapbox://styles/mapbox/satellite-v9`,
    });
  }
  
  setMarkersAndBounds(jobsites) {

    for (let item of jobsites) {
      let marker = new mapboxgl.Marker({
        color: '#fbbf24',
      })
        .setLngLat([parseFloat(item.longitude), parseFloat(item.latitude)])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div className='grid p-2 gap-2'><p>Content</p><p>Content</p></div>`
          )
        )
        .addTo(this.map);
    }

    //mapbounds setting
    let zero = this.makeLL(jobsites[0]);
    const bounds = new mapboxgl.LngLatBounds(
      zero,zero
    );
    for (let item of jobsites) {
      bounds.extend(this.makeLL(item));
    }
    this.map.fitBounds(bounds, { padding: 100 });
    this.map.setMaxZoom(14);
    this.map.setMaxZoom(22);
  }

  centerOf(jobsites) {
    let lat = 0;
    let lon = 0;
    for(let item of jobsites) {
      lat += item.latitude;
      lon += item.longitude;
    }
    return { lon: lon/jobsites.length, lat: lat/jobsites.length};
  }
  makeLL(obj) {
    return new mapboxgl.LngLat(obj.longitude,obj.latitude);
  }
}
