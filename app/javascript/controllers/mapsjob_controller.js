import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';
// Connects to data-controller="mapper"
export default class extends Controller {
  static targets = ['targetaddress', 'jobid'];

  connect() {
    this.job_id = this.jobidTarget.innerText;

    //fetch geocoding API for property address
    // .then render map
    const prefix =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const middle = '.json?access_token=';
    const accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';
    const addressTarget = this.targetaddressTarget.innerText;

    this.mapboxInit(accesstoken);

    fetch(prefix + addressTarget + middle + accesstoken)
      .then((response) => response.json())
      .then((geocode) => {
        fetch('/data/jobtrees?jid=' + this.job_id)
          .then((response) => response.json())
          .then((treedata) => {
            this.setInitialThisLatLng(geocode, treedata);
            this.map.setCenter([
              this.initialLongitude,
              this.initialLatitude,
            ]);
            if (this.tree_index > 0)
              this.setMarkersAndBounds(treedata);
          });
      });
  }
  mapboxInit(token) {
    const honolulu = [-157.858093, 21.315603];
    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      center: honolulu, // starting position [lng, lat]
      zoom: 9, // starting zoom
      //cooperativeGestures: true,
      style: `mapbox://styles/mapbox/satellite-v9`,
    });
  }
  setInitialThisLatLng(geocode, treedata) {
    let lat = 0;
    let lon = 0;
    this.tree_index = 0;

    //find center of all tree lat/lon coords
    for (let item of treedata) {
      this.tree_index++;
      lat += item.latitude;
      lon += item.longitude;
    }

    if (this.tree_index > 0) {
      this.initialLongitude = lon / this.tree_index;
      this.initialLatitude = lat / this.tree_index;
    } else {
      this.initialLongitude = geocode.features[0].center[0];
      this.initialLatitude = geocode.features[0].center[1];
    }
  }
  setMarkersAndBounds(treedata) {
    //mapbounds collection
    let features = [
      { lon: this.initialLongitude, lat: this.initialLatitude },
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
