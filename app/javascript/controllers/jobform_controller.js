import { Controller } from '@hotwired/stimulus';
import flatpickr from 'flatpickr';
import mapboxgl from 'mapbox-gl';

// Connects to data-controller="jobform"
export default class extends Controller {
  static targets = [
    'pid',
    'treelist',
    'vehiclecheckboxes',
    'equipmentcheckboxes',
    'hiddenforms'
  ];
  connect() {
    //datetime picker elements in form
    let start = document.getElementById('startdate');
    let end = document.getElementById('enddate');
    const fpstart = flatpickr('#startdate', {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      //most of this is to insert the UTC offset from the client computer
      onClose: function (selectedDates, dateStr, instance) {
        let input = document.getElementById('jobstart');
        let out = new Date(dateStr).toISOString();
        input.value = out;
        console.log(input.value);
      },
    });
    const fpend = flatpickr('#enddate', {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      onClose: function (selectedDates, dateStr, instance) {
        let input = document.getElementById('jobend');
        let out = new Date(dateStr).toISOString();
        input.value = out;
        console.log(input.value);
      },
    });

    //colors for toggleMarker
    this.startcolor = '#07a7cb';
    this.brightcolor = '#6ee7b7';

    //state for array inputs
    this.state = {
      trees: [],
    };

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

        this.mapboxInit(accesstoken, [
          property.longitude,
          property.latitude,
        ]);

        if (treedata.length > 0) {
          this.initPopups();
          this.setMarkersAndBounds();
        } else {
          this.propertymarker = new mapboxgl.Marker({
            color: this.startcolor,
          })
            .setLngLat([property.longitude, property.latitude])
            .addTo(this.map);
        }
      });
    this.setVehicleListeners();
    this.setEquipmentListeners();
  }
  //logging only while i debug tree submission
  setVehicleListeners() {
    if (this.vehiclecheckboxesTarget.children.length == 0) return;

    for (let frame of this.vehiclecheckboxesTarget.children) {
      frame.firstElementChild.addEventListener('click', (event) => {
        if(event.target.checked) {
          this.addHiddenArrayInput('vehicles', event.target.dataset.vehicle, 'textbox')
        } else {
          this.removeHiddenArrayInput('vehicles', event.target.dataset.vehicle, 'textbox')
        }
      });
    }
  }
  setEquipmentListeners() {
    if (this.equipmentcheckboxesTarget.children.length > 0) {
      for (let frame of this.equipmentcheckboxesTarget.children) {
        frame.firstElementChild.addEventListener('click', (event) => {
          if(event.target.checked) {
            this.addHiddenArrayInput('equipment', event.target.dataset.equipment)
          } else {
            this.removeHiddenArrayInput('equipment', event.target.dataset.equipment)
          }
        });
      }
    }
  }
  //this.connect() Utilities
  mapboxInit(token, center) {
    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map({
      container: 'jobmap', // container ID
      center: center, // starting position [lng, lat]
      zoom: 15, // starting zoom
      //cooperativeGestures: true,
      style: `mapbox://styles/mapbox/satellite-v9`,
    });
  }
  setMarkersAndBounds() {
    //mapbounds collection
    let center = this.getMarkerAvgCenter(this.trees);
    let features = [{ lon: center[0], lat: center[1] }];

    for (let i = 0; i < this.trees.length; i++) {
      //make marker for each tree
      let marker = new mapboxgl.Marker({
        color: this.startcolor,
      })
        .setLngLat([
          this.trees[i].longitude,
          this.trees[i].latitude,
        ])
        .addTo(this.map);
      //add listener to call ToggleMarker onClick
      //Toggles the Marker and manipulates our form input, adding and removing the tree IDs
      //i tracks the popup index in
      marker.getElement().addEventListener('click', () => {
        this.toggleMarker(
          marker,
          this.startcolor,
          this.brightcolor,
          this.map,
          this.trees[i].id
        );
      });
      //add listeners to show/hidePopup on hover
      marker.getElement().addEventListener('mouseenter', () => {
        this.showPopup(i);
      });
      marker.getElement().addEventListener('mouseleave', () => {
        this.hidePopup(i);
      });

      //add this tree to mapbounds collection
      features.push({
        lon: this.trees[i].longitude,
        lat: this.trees[i].latitude,
      });
    }
    //mapbounds initial setting
    const bounds = new mapboxgl.LngLatBounds(
      features[0],
      features[0]
    );
    //add all of our trees we collected above and fitBounds
    for (let item of features) {
      bounds.extend(item);
    }
    this.map.fitBounds(bounds, { padding: 100 });
    this.map.setMaxZoom(20);
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
  //treedataIndex ties the treedata to marker
  toggleMarker(marker, start, bright, map, treeId) {
    //base my action on the current color
    let nextcolor;
    let addremove;
    if (marker._color == start) {
      nextcolor = bright;
      addremove = true;
    } else {
      nextcolor = start;
      addremove = false;
    }

    if (addremove) {
      this.addToTreeList(treeId);
      this.addHiddenArrayInput('trees', treeId, 'number')
    } else {
      this.removeFromTreeList(treeId);
      this.removeHiddenArrayInput('trees',treeId)
    }

    //swap out the marker for a new one in the alternate color
    let backup = marker;
    marker.remove;

    let newmarker = new mapboxgl.Marker({
      color: nextcolor,
    })
      .setLngLat(backup.getLngLat())
      .addTo(map);

    //new toggleMarker event listener for the new Marker
    newmarker.getElement().addEventListener('click', () => {
      this.toggleMarker(newmarker, start, bright, map, treeId);
    });

    //hover popup event listeners for the new Marker
    let popupindex = this.indexOfID(treeId);
    newmarker.getElement().addEventListener('mouseenter', () => {
      this.showPopup(popupindex);
    });
    newmarker.getElement().addEventListener('mouseleave', () => {
      this.hidePopup(popupindex);
    });
  }
  initPopups() {
    this.popups = [];
    for (let item of this.trees) {
      let newpop = new mapboxgl.Popup({
        anchor: 'top-left',
        closeButton: false,
      })
        .setHTML(
          `<div className='grid p-2 gap-2 w-40'><p>${item.species}</p><p>${item.dbh} DBH</p><p>${item.crown} crown</p></div>`
        )
        .setLngLat([item.longitude, item.latitude]);

      this.popups.push(newpop);
    }
  }
  showPopup(index) {
    this.popups[index].addTo(this.map);
  }
  hidePopup(index) {
    this.popups[index].remove();
  }
  addToTreeList(treeid) {
    let tree = this.trees.find((tree) => tree.id == treeid);
    let row = document.createElement('div');
    row.classList.add('flex', 'gap-2', 'px-2');

    let species = document.createElement('p');
    let stext = document.createTextNode(
      this.capitalize(tree.species)
    );
    species.appendChild(stext);
    row.appendChild(species);

    let dbh = document.createElement('p');
    let dtext = document.createTextNode(tree.dbh + '"');
    dbh.appendChild(dtext);
    row.appendChild(dbh);

    let crown = document.createElement('p');
    let ctext = document.createTextNode(this.capitalize(tree.crown));
    crown.appendChild(ctext);
    row.appendChild(crown);
    row.dataset.treeid = treeid;

    this.treelistTarget.appendChild(row);
  }
  removeFromTreeList(treeid) {
    for (let item of this.treelistTarget.children) {
      if (item.dataset.treeid == treeid) {
        this.treelistTarget.removeChild(item);
      }
    }
  }
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  indexOfID(id) {
    for (let i = 0; i < this.trees.length; i++) {
      if (this.trees[i].id == id) return i;
    }
    return -1;
  }

  //generic for trees, equipment, and vehicles parameters, require handling in jobs#create
  addHiddenArrayInput(attributename, value, type) {
    let newinput = document.createElement('input');
    newinput.type = type;
    newinput.name = `job[${attributename}][]`
    newinput.value = value;
    this.hiddenformsTarget.appendChild(newinput);
  }
  removeHiddenArrayInput(attributename, value) {
    for(let item of this.hiddenformsTarget.children) {
      if(item.name == `job[${attributename}][]` && item.value == value) {
        item.remove();
      }
    }
  }

  debug() {
    console.log(document.getElementById('job_start').value);
  }
  

}
