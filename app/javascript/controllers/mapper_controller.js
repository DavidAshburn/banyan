import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';
// Connects to data-controller="mapper"
export default class extends Controller {
  static targets = ['markerlat', 'markerlon'];

  connect() {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';

    this.initialLongitude = -74.5;
    this.initialLatitude = 40;

    this.markerlng = this.initialLongitude;
    this.markerlat = this.initialLatitude;

    const coordinates = document.getElementById('coordinates');
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      center: [this.initialLongitude, this.initialLatitude], // starting position [lng, lat]
      zoom: 18, // starting zoom
      cooperativeGestures: true,
      style: `mapbox://styles/mapbox/satellite-v9`,
    });

    this.dragger = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([this.initialLongitude, this.initialLatitude])
      .addTo(this.map);

    let latTarg = this.markerlatTarget;
    let lonTarg = this.markerlonTarget;
    latTarg.innerText = `Latitude:  ${this.initialLongitude}`;
    lonTarg.innerText = `Longitude:  ${this.initialLatitude}`;

    let thisdragger = this.dragger;
    function onDragEnd() {
      const lngLat = thisdragger.getLngLat();
      latTarg.innerText = `Latitude:  ${lngLat.lat}`;
      lonTarg.innerText = `Longitude:  ${lngLat.lng}`;
    }

    this.dragger.on('dragend', onDragEnd);

    //populate markers for data

    this.dataset = [
      {
        lng: -74.49966937208349,
        lat: 39.99994378317297,
      },
      {
        lng: -74.49969625394637,
        lat: 39.99995610311163,
      },
    ];

    for (let item of this.dataset) {
      let marker = new mapboxgl.Marker({
        color: '#fbbf24',
      })
        .setLngLat([item.lng, item.lat])
        .addTo(this.map);
    }
  }

  getLatLng() {
    let lat = parseFloat(
      this.markerlatTarget.innerText.split(':')[1]
    );
    let lng = parseFloat(
      this.markerlonTarget.innerText.split(':')[1]
    );
    console.log('Lat: ' + lat);
    console.log('Lng: ' + lng);
  }

  addToData() {
    let lat = parseFloat(
      this.markerlatTarget.innerText.split(':')[1]
    );
    let lng = parseFloat(
      this.markerlonTarget.innerText.split(':')[1]
    );

    this.dataset.push({
      lng: lng,
      lat: lat,
    });

    let marker = new mapboxgl.Marker({
      color: '#fbbf24',
    })
      .setLngLat([lng, lat])
      .addTo(this.map);

    this.dragger.setLngLat([
      this.initialLongitude,
      this.initialLatitude,
    ]);
  }

  reportData() {
    console.dir(this.dataset);
  }
}
