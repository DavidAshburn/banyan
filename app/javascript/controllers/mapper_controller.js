//geocoding debugging, in user/debug @ TOW

import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';

// Connects to data-controller="propshowmap"
export default class extends Controller {
  static targets = ['pid'];
  connect() {

    
    const prefix =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const middle = '.json?access_token=';
    const accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';

    fetch(prefix + '1754 ala noe way, honolulu HI 96819' + middle + accesstoken)
      .then((response) => response.json())
      .then((geocode) => {
        console.log(geocode);
        this.codes = [];
        for(let item of geocode.features) {
          this.codes.push(item.center);
        }

        this.mapboxInit(accesstoken, this.codes[0]);

        this.setMarkersAndBounds(this.codes, this.codes[0]);
      }
    );
  }

  mapboxInit(token, center) {
    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map({
      container: 'debugmap', // container ID
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
      console.log('item: ' + item);
      let marker = new mapboxgl.Marker({
        color: '#fbbf24',
        draggable: true,
      })
        .setLngLat(item)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div className='grid p-2 gap-2 w-40'><p>${item[0]}</p><p>${item[1]}</p></div>`
          )
        )
        .addTo(this.map);
      features.push(item.center);
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

}
