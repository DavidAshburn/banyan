import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';

// Connects to data-controller="propshowmap"
export default class extends Controller {
  static targets = ['pid', 'setmarkerbutton', 'movemarkerbutton'];
  
  connect() {
    this.startcolor = '#07a7cb';
    this.highcolor = '#f87954';

    let property_id = this.pidTarget.innerText;
    const accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';

    fetch('/data/proptrees?pid=' + property_id)
      .then((response) => response.json())
      .then((propertydata) => {
        let property = propertydata[0];
        let treedata = propertydata[1];
        this.latestCenter = [property.longitude, property.latitude];
        this.mapboxInit(accesstoken, this.latestCenter);

        if (treedata.length > 0) {
          let calcCenter = this.getMarkerAvgCenter(treedata);
          //this.map.setCenter(calcCenter);
          this.setMarkersAndBounds(treedata, calcCenter);
          this.movemarkerbuttonTarget.classList.toggle('hidden');
        } else {
          this.propertymarker = new mapboxgl.Marker({
            color: '#07a7cb',
          })
            .setLngLat(this.latestCenter)
            .addTo(this.map);
        }
      });
  }

  //this.connect() Utilities
  mapboxInit(token, center) {
    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map({
      container: 'propshowmap', // container ID
      center: center, // starting position [lng, lat]
      zoom: 16, // starting zoom
      //cooperativeGestures: true,
      style: `mapbox://styles/mapbox/satellite-v9`,
    });
  }
  setMarkersAndBounds(treedata, center) {
    //mapbounds collection
    let features = [{ lon: center[0], lat: center[1] }];

    for (let item of treedata) {
      let marker = new mapboxgl.Marker({
        color: this.startcolor,
      })
        .setLngLat([item.longitude, item.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div className='grid p-2 gap-2 w-40'><p>${item.species}</p><p>${item.dbh} DBH</p><p>${item.crown} crown</p></div>`
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
    this.map.fitBounds(bounds, { padding: 200 });
  }
  getMarkerAvgCenter(treedata) {
    let lat = 0;
    let lon = 0;
    for (let item of treedata) {
      lat += item.latitude;
      lon += item.longitude;
    }
    let center = [lon / treedata.length, lat / treedata.length];
    return center;
  }

  //Move Marker button action
  editPropMarker() {
    this.propertymarker.remove();
    this.propertymarker = new mapboxgl.Marker({
      color: this.highcolor,
      draggable: true,
    })
      .setLngLat(this.latestCenter)
      .addTo(this.map);

    this.propertymarker.on('dragend', (event) => {
      this.latestCenter = event.target._lngLat;
    });
    this.setmarkerbuttonTarget.classList.toggle('hidden');
    this.movemarkerbuttonTarget.classList.toggle('hidden');
  }
  //Set Marker button action
  setPropMarker() {
    this.setmarkerbuttonTarget.classList.toggle('hidden');
    this.movemarkerbuttonTarget.classList.toggle('hidden');
    this.propertymarker.remove();
    this.propertymarker = new mapboxgl.Marker({
      color: '#07a7cb',
    })
      .setLngLat(this.latestCenter)
      .addTo(this.map);

    this.postPropLatLng();
  }
  //setPropMarker Utility
  postPropLatLng() {
    let center = this.propertymarker._lngLat;
    let property_id = this.pidTarget.innerText;
    let token = document.getElementsByName('csrf-token')[0].content

    fetch(
      '/edit/locupdate?pid=' +
        property_id +
        '&lng=' +
        center.lng +
        '&lat=' +
        center.lat, { method: 'POST',  headers: {
          "X-CSRF-Token": token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }, }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
}
