import { Controller } from '@hotwired/stimulus';
import mapboxgl from 'mapbox-gl';

export default class extends Controller {
  static targets = ['jobid', 'jobstart','jobend','jobstartview','jobendview'];

  connect() {
    this.job_id = this.jobidTarget.innerText;
    this.jobstartviewTarget.innerText = this.getlocalTime(this.jobstartTarget.innerText);
    this.jobendviewTarget.innerText = this.getlocalTime(this.jobendTarget.innerText);
    

    const accesstoken = document.getElementById('mapboxpub').innerText;

    fetch('/data/jobtrees?jid=' + this.job_id)
      .then((response) => response.json())
      .then((data) => {
        let treedata = data.trees;
        let property = data.property;

        this.mapboxInit(accesstoken, [property.longitude,property.latitude]);

        console.log(treedata);
        console.log(property);


        if (treedata.length > 0)
          this.setMarkersAndBounds(treedata, property.longitude, property.latitude);
          this.map.setMaxZoom(18);
          this.map.setMaxZoom(21);
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
      console.log(item);
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

  getlocalTime(datetime) {
    console.log(datetime);

    let input = new Date(datetime);
    return new Date(input.getTime()).toLocaleString()
  }
}
