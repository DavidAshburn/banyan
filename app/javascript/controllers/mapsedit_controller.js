import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';
// Connects to data-controller="mapper"
export default class extends Controller {
  static targets = ['targetaddress', 'latitude', 'longitude', 'pid'];

  connect() {

    //dont need geocode if property always has lat long now

    this.property_id = this.pidTarget.value;
    const accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';

    

    fetch('/data/proptrees?pid=' + this.property_id)
      .then((response) => response.json())
      .then((propertydata) => {
        let property = propertydata[0];
        let treedata = propertydata[1]

        this.mapboxInit(accesstoken, [property.longitude, property.latitude]);
        this.setBackupListeners();
        if (treedata.length > 0) this.setMarkersAndBounds(treedata, property.longitude, property.latitude);
      });
  }

  addTree() {
    let el = document.getElementById('treeinputs');
    let buttons = document.getElementById('treecontrols');

    el?.classList.toggle('hidden');
    buttons?.classList.toggle('hidden');
  }
  saveTree(event) {

    let center = this.map.getCenter(); //{lng: x, lat: y}
    let marker = new mapboxgl.Marker({
      color: '#fbbf24',
    })
      .setLngLat([center.lng, center.lat])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          `<div className='grid p-2 gap-2'><p>${this.lastspecies}</p><p>${this.lastdbh} DBH</p><p>${this.lastcrown} crown</p></div>`
        )
      )
      .addTo(this.map);
  }
  cancelAddTree() {
    let el = document.getElementById('treeinputs');
    let buttons = document.getElementById('treecontrols');

    el?.classList.toggle('hidden');
    buttons?.classList.toggle('hidden');
  }//unused

  mapboxInit(token, center) {
    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      center: center, // starting position [lng, lat]
      zoom: 17, // starting zoom
      //cooperativeGestures: true,
      style: `mapbox://styles/mapbox/satellite-v9`,
    });
    this.map.on('moveend', (e) => {
      let center = this.map.getCenter(); //{lng: x, lat: y}
      document.getElementById('latitudeform').value =
        center.lat;
      document.getElementById('longitudeform').value =
        center.lng;
      document.getElementById('property_id').value =
        this.property_id;
    });
  }

  setMarkersAndBounds(treedata, longitude, latitude) {
    //mapbounds collection
    let features = [{ lon: longitude, lat: latitude },];

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
      features.push({ lon: item.longitude, lat: item.latitude });
    }

    //mapbounds setting
    const bounds = new mapboxgl.LngLatBounds(features[0],features[0]);
    for (let item of features) {
      bounds.extend(item);
    }
    this.map.fitBounds(bounds, { padding: 40 });
  }

  setBackupListeners() {
    this.lastspecies = '';
    this.lastdbh = 0;
    this.lastcrown = '';
    //listeners
    let spcf = document.getElementById('speciesfield');
    spcf?.addEventListener('blur', () => {
      this.lastspecies = spcf.value;
    });

    let dbhf = document.getElementById('dbhfield');
    dbhf?.addEventListener('blur', () => {
      this.lastdbh = dbhf.value;
    });

    let crf = document.getElementById('crownfield');
    crf?.addEventListener('blur', () => {
      this.lastcrown = crf.value;
    });
  }
}