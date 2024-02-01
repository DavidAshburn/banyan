import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';
// Connects to data-controller="mapper"
export default class extends Controller {
  static targets = ['targetaddress'];

  connect() {
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
        console.log(data);
        /*
        this.initialLongitude = -74.5;
        this.initialLatitude = 40;

        const coordinates = document.getElementById('coordinates');
        this.map = new mapboxgl.Map({
          container: 'map', // container ID
          center: [this.initialLongitude, this.initialLatitude], // starting position [lng, lat]
          zoom: 18, // starting zoom
          cooperativeGestures: true,
          style: `mapbox://styles/mapbox/satellite-v9`,
        });
        */
      });
  }
}
