import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';

// Connects to data-controller="propshowmap"
export default class extends Controller {
  static targets = ['pid'];
  connect() {

    this.property_id = this.pidTarget.innerText;
    const accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';


    fetch('/data/proptrees?pid=' + this.property_id)
      .then((response) => response.json())
      .then((propertydata) => {
        let property = propertydata[0];
        let treedata = propertydata[1];

        this.mapboxInit(accesstoken, [
          property.longitude,
          property.latitude,
        ]);
        if (treedata.length > 0) {
          let calcCenter = this.getMarkerAvgCenter(treedata);
          //this.map.setCenter(calcCenter);
          this.setMarkersAndBounds(treedata, calcCenter);
        } else {
          let marker = new mapboxgl.Marker({
            color: '#07a7cb',
          })
            .setLngLat([property.longitude, property.latitude])
            .addTo(this.map);
        }
          
      });
  }

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
    let features = [
      { lon: center[0], lat:center[1] },
    ];

    for (let item of treedata) {
      let marker = new mapboxgl.Marker({
        color: '#fbbf24',
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
    const bounds = new mapboxgl.LngLatBounds(
      features[0],
      features[0]
    );
    for (let item of features) {
      bounds.extend(item);
    }
    this.map.fitBounds(bounds, { padding: 200 });
  }

  getMarkerAvgCenter(treedata) {
    let lat = 0;
    let lon = 0;
    for(let item of treedata) {
      lat += item.latitude;
      lon += item.longitude;
    }
    let center = [lon/treedata.length, lat/treedata.length];
    return center;
  }

}
