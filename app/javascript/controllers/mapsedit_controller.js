import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';
// Connects to data-controller="mapper"
export default class extends Controller {
  static targets = [
    'targetaddress',
    'trees',
    'latitude',
    'longitude',
    'pid',
  ];

  connect() {
    //retrieve property.trees from the DOM
    let treejson = this.treesTarget.innerText;
    const regex = /=>/g;
    this.trees = JSON.parse(treejson.replace(regex, ':'));

    //property_id
    this.property_id = this.pidTarget.value;

    let lat = 0;
    let lon = 0;
    let index = 0;

    //find center of all tree lat/lon coords
    for (let item of this.trees) {
      index++;
      lat += item.latitude;
      lon += item.longitude;
    }
    this.initialLongitude = lon / index;
    this.initialLatitude = lat / index;

    //fetch geocoding API for property address
    // .then render map
    const prefix =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const middle = '.json?access_token=';
    this.accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';
    this.addressTarget = this.targetaddressTarget.innerText;

    fetch(prefix + this.addressTarget + middle + this.accesstoken)
      .then((response) => response.json())
      .then((data) => {
        mapboxgl.accessToken = this.accesstoken;

        this.latitudeTarget.innerText = this.initialLatitude;
        this.longitudeTarget.innerText = this.initialLongitude;

        this.map = new mapboxgl.Map({
          container: 'map', // container ID
          center: [this.initialLongitude, this.initialLatitude], // starting position [lng, lat]
          zoom: 18, // starting zoom
          //cooperativeGestures: true,
          style: `mapbox://styles/mapbox/satellite-v9`,
        });

        for (let item of this.trees) {
          let marker = new mapboxgl.Marker({
            color: '#fbbf24',
          })
            .setLngLat([item.longitude, item.latitude])
            .addTo(this.map);
        }

        this.map.on('moveend', (e) => {
          let center = this.map.getCenter(); //{lng: x, lat: y}
          this.latitudeTarget.innerText = center.lat;
          this.longitudeTarget.innerText = center.lng;
          document.getElementById('latitudeform').value = center.lat;
          document.getElementById('longitudeform').value = center.lng;
          document.getElementById('property_id').value =
            this.property_id;
        });

        //mapbounds collection
        let features = [];

        for (let item of this.trees) {
          let marker = new mapboxgl.Marker({
            color: '#fbbf24',
          })
            .setLngLat([item.longitude, item.latitude])
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

        this.map.fitBounds(bounds, { padding: 40 });
      });
  }

  addTree() {
    let el = document.getElementById('treeinputs');
    let buttons = document.getElementById('treecontrols');

    el?.classList.toggle('hidden');
    buttons?.classList.toggle('hidden');
  }

  cancelAddTree() {
    let el = document.getElementById('treeinputs');
    let buttons = document.getElementById('treecontrols');

    el?.classList.toggle('hidden');
    buttons?.classList.toggle('hidden');
  }
}
