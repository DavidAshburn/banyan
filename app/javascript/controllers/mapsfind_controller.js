import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';
// Connects to data-controller="mapper"
export default class extends Controller {
  static targets = ['targetaddress', 'trees','latitude','longitude'];

  connect() {

    let treejson = this.treesTarget.innerText;
    const regex = /=>/g;
    this.trees = JSON.parse(treejson.replace(regex, ':'));

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

        this.initialLongitude = data.features[0].center[0];
        this.initialLatitude = data.features[0].center[1];

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
        })
      }
    );

    this.newTrees = [];
  }

  addTree() {
    let center = this.map.getCenter();

    let marker = new mapboxgl.Marker({
      color: '#07a7cb',
    })
    .setLngLat([center.lng, center.lat])
    .addTo(this.map);

    this.newTrees.push({lng:center.lng, lat:center.lat});
  }

  saveTrees() {
    console.log('save trees');
  }
  

}
