import { Controller } from '@hotwired/stimulus';
import flatpickr from 'flatpickr';
import mapboxgl from 'mapbox-gl';

// Connects to data-controller="jobform"
export default class extends Controller {
  static targets = ['pid'];
  connect() {
    let start = document.getElementById('startdate');
    let end = document.getElementById('enddate');
    this.startcolor = '#07a7cb';
    this.highcolor = '#f87954';
    let property_id = this.pidTarget.innerText;
    const accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';

    const fpstart = flatpickr('#startdate', {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      onClose: function (selectedDates, dateStr, instance) {
        document.getElementById('job_start').value = dateStr;
        console.log(dateStr);
      },
    });

    const fpend = flatpickr('#enddate', {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      onClose: function (selectedDates, dateStr, instance) {
        document.getElementById('job_end').value = dateStr;
        console.log(dateStr);
      },
    });

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
        } else {
          this.propertymarker = new mapboxgl.Marker({
            color: '#07a7cb',
          })
            .setLngLat(this.latestCenter)
            .addTo(this.map);
        }
      });

      fetch('/data/geojson?pid=' + property_id)
      .then((response) => response.json())
      .then((geojson) => {
        console.log(geojson);
      });

    initializePopups(treedata);
  }

  //this.connect() Utilities
  mapboxInit(token, center) {
    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map({
      container: 'jobmap', // container ID
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
        .addTo(this.map);

      marker.getElement().addEventListener('click',()=>{
        let newcenter = marker.getLngLat();

        marker.remove();
        let highlighted = new mapboxgl.Marker({
          color: this.highcolor,
        })
          .setLngLat(newcenter)
          .addTo(this.map);
      });

        

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
    this.map.fitBounds(bounds, { padding: 300 });
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
  initializeData(geojson) {

  }
}
