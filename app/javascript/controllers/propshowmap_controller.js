import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="propshowmap"
export default class extends Controller {
  
  connect() {
    this.property = {};
    this.dataTarget = document.getElementById('showmapdata');
    this.typeTarget = document.getElementById('showmapdatatype');

    this.data = this.dataTarget.innerText;
    this.datatype = this.typeTarget.innerText;

    this.dataTarget.addEventListener('change', () => {
      this.data = this.dataTarget.innerText;
    });

    this.typeTarget.addEventListener('change', () => {
      this.datatype = this.typeTarget.innerText;
      this.updateMap
    });

    fetch(`/data/property?pid=${property_id}`)
      .then((response) => response.json())
      .then((data) => {
        this.property = data;
      });

    const accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';

    this.mapboxInit(accesstoken);

    this.setInitialThisLatLng(geocode, treedata);
    this.map.setCenter([
      this.initialLongitude,
      this.initialLatitude,
    ]);
    if (this.tree_index > 0)
      this.setMarkersAndBounds(treedata);

  }
}
//stub
