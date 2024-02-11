import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';

export default class extends Controller {
  static targets = ['jobid'];

  connect() {
    this.job_id = this.jobidTarget.innerText;

    const accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';

    fetch('/data/jobtrees?jid=' + this.job_id)
      .then((response) => response.json())
      .then((data) => {
        let treedata = data.trees;
        let property = data.property;

        this.mapboxInit(accesstoken, [property.longitude,property.latitude]);

        if (treedata.length > 0)
          this.setMarkersAndBounds(treedata, property.longitude, property.latitude);
      });
    
    //event listeners for each row item so they can switch the marker color
    
  }
  mapboxInit(token, center) {
    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      center: center, // starting position [lng, lat]
      zoom: 14,
      //cooperativeGestures: true,
      style: `mapbox://styles/mapbox/satellite-v9`,
    });
  }

  setMarkersAndBounds(treedata, longitude, latitude) {
    //mapbounds collection
    let features = [
      { lon: longitude, lat: latitude },
    ];

    for (let item of treedata) {
      let marker = new mapboxgl.Marker({
        color: '#fbbf24',
      })
        .setLngLat([item.longitude, item.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div className='grid p-2 gap-2'><p>${item.species}</p><p>${item.dbh} DBH</p><p>${item.crown} crown</p></div>`
          )
        )
        .addTo(this.map);

      //build mapbounds collection
      features.push({ lon: item.longitude, lat: item.latitude });
    }

    //mapbounds setting
    const bounds = new mapboxgl.LngLatBounds(
      features[0],
      features[0]
    );
    for (let item of features) {
      bounds.extend(item);
    }
    this.map.fitBounds(bounds, { padding: 100 });

    if(features.length == 1) {
      this.map.setZoom(8);
    }
  }
}
