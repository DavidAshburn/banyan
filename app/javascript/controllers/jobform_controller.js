import { Controller } from '@hotwired/stimulus';
import flatpickr from 'flatpickr';
import mapboxgl from 'mapbox-gl';

// Connects to data-controller="jobform"
export default class extends Controller {
  static targets = ['pid', 'treelist'];
  connect() {
    //datetime picker elements in form
    let start = document.getElementById('startdate');
    let end = document.getElementById('enddate');
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

    //colors for toggleMarker
    this.startcolor = "#07a7cb";
    this.brightcolor = "#6ee7b7"

    //state for selected trees sent to form input id:treesinput
    this.selectedTrees = [];

    //fetch property and tree data, then populate map
    let property_id = this.pidTarget.innerText;
    const accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';
    fetch('/data/proptrees?pid=' + property_id)
      .then((response) => response.json())
      .then((propertydata) => {
        let property = propertydata[0];
        let treedata = propertydata[1];
        this.trees = treedata;

        this.mapboxInit(accesstoken, [property.longitude, property.latitude]);

        if (treedata.length > 0) {
          this.initPopups(treedata); //this.popups gets passed in to toggleMarker
          this.setMarkersAndBounds(treedata, this.getMarkerAvgCenter(treedata));
        } else {
          this.propertymarker = new mapboxgl.Marker({
            color: this.startcolor,
          })
            .setLngLat([property.longitude, property.latitude])
            .addTo(this.map);
        }

        
      });
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
    let treeIndex = 0;
    for (let item of treedata) {
      let treeIndexValue = treeIndex;
      let marker = new mapboxgl.Marker({
        color: this.startcolor,
      })
        .setLngLat([item.longitude, item.latitude])
        .addTo(this.map);

      marker.getElement().addEventListener('click',()=>{
        this.toggleMarker(marker, this.startcolor, this.brightcolor, this.map, treeIndexValue);
      });
      marker.getElement().addEventListener('mouseenter', () => {
        this.showPopup(treeIndexValue);
      });
      marker.getElement().addEventListener('mouseleave', () => {
        this.hidePopup(treeIndexValue);
      });

      features.push({ lon: item.longitude, lat: item.latitude });
      treeIndex++;
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
  toggleMarker(marker, start, bright, map, treeIndexValue) {

    let nextcolor;
    let addremove;
    if(marker._color == start) {
      nextcolor = bright;
      addremove = true;
    } else {
      nextcolor = start
      addremove = false;
    }

    if(addremove) {
      this.addToTreeList(treeIndexValue);
      this.addToFormInput(treeIndexValue);
    } else {
      this.removeFromTreeList(treeIndexValue);
      this.removeFromFormInput(treeIndexValue);
    }

    let backup = marker;
    marker.remove;

    let newmarker = new mapboxgl.Marker({
      color: nextcolor,
    })
      .setLngLat(backup.getLngLat())
      .addTo(map);

    newmarker.getElement().addEventListener('click',()=>{
      this.toggleMarker(newmarker, start, bright, map, treeIndexValue);
    });
    newmarker.getElement().addEventListener('mouseenter', () => { 
      this.showPopup(treeIndexValue);
    });
    newmarker.getElement().addEventListener('mouseleave', () => {
      this.hidePopup(treeIndexValue);
    });
  }
  initPopups(treedata) {
    this.popups = []
    for(let item of treedata) {
      let newpop = new mapboxgl.Popup({anchor:'top-left', closeButton: false})
      .setHTML(
        `<div className='grid p-2 gap-2 w-40'><p>${item.species}</p><p>${item.dbh} DBH</p><p>${item.crown} crown</p></div>`
        )
      .setLngLat([item.longitude, item.latitude])

      this.popups.push(newpop);
    };
  }
  showPopup(index) {
    this.popups[index].addTo(this.map);
  }
  hidePopup(index) {
    this.popups[index].remove();
  }
  addToTreeList(treeindex) {
    let tree = this.trees[treeindex];
    let row = document.createElement('div');
    row.classList.add('flex','gap-2','px-2');

    let species = document.createElement('p');
    let stext = document.createTextNode(tree.species)
    species.appendChild(stext);
    row.appendChild(species);

    let dbh = document.createElement('p');
    let dtext = document.createTextNode(tree.dbh)
    dbh.appendChild(dtext);
    row.appendChild(dbh);

    let crown = document.createElement('p');
    let ctext = document.createTextNode(tree.crown)
    crown.appendChild(ctext);
    row.appendChild(crown);
    row.dataset.treeindex = treeindex;

    this.treelistTarget.appendChild(row);
  }
  removeFromTreeList(treeindex) {
    let targetrow;
    for(let item of this.treelistTarget.children) {
      if(item.dataset.treeindex == treeindex){
        targetrow = item;
      }
    }
    this.treelistTarget.removeChild(targetrow);
  }
  addToFormInput(treeindex) {
    this.selectedTrees.push(treeindex);
    document.getElementById('treesinput').value = this.selectedTrees;
  }
  removeFromFormInput(treeindex) {
    let index = this.selectedTrees.indexOf(treeindex);
    if(index > -1) {
      this.selectedTrees.splice(index, 1);
    }
    document.getElementById('treesinput').value = this.selectedTrees;
  }
}
