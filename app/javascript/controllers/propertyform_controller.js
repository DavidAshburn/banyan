import { Controller } from '@hotwired/stimulus';

// Connects to data-controller="propform"
export default class extends Controller {
  static targets = ['nameinput'];
  connect() {
    this.client = {};
    this.contactTarget = document.getElementById('contactnamein');
    this.clientSelect = document.getElementById('property_client_id');
    console.log(window.location.search);
    //check route source based on url search tag contents
    //we handle :client_id form input differently if it is preset
    let searchlength = window.location.search.length;
    if (searchlength == 0) {
      this.clientSelect.addEventListener('change', () => {
        let selectedclient = '';
        for (let item of this.clientSelect.children) {
          if (item.selected) selectedclient = item;
        }

        //add name and reset other fields
        this.contactTarget.value = selectedclient.text;
        document.getElementById('phonein').value = '';
        document.getElementById('emailin').value = '';

        //propcount tells us if we should auto-copy contact info from the Client
        fetch('/data/client?cid=' + selectedclient.value)
          .then((response) => response.json())
          .then((data) => {
            this.client = data.client;
            this.propcount = data.property_count;
            this.contactTarget.value = data.client.name;
          });
      });
    } else {
      let client_id = window.location.search.split('=')[1];
      fetch('/data/client?cid=' + client_id)
        .then((response) => response.json())
        .then((data) => {
          this.client = data.client;
          this.propcount = data.property_count;
        });
    }
    this.propertytypeselect = document.getElementById(
      'property_property_type'
    );
    this.address = document.getElementById('addressin');
    this.latitude = document.getElementById('forminlatitude');
    this.longitude = document.getElementById('forminlongitude');

    const prefix =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const middle = '.json?access_token=';
    const accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';

    this.propertytypeselect?.addEventListener('change', (event) => {
      if (this.propcount < 1 && this.client != {}) {
        this.address.value = this.client.mail_address;
        document.getElementById('phonein').value = this.client.phone;
        document.getElementById('emailin').value = this.client.email;
        fetch(
          prefix + this.client.mail_address + middle + accesstoken
        )
          .then((response) => response.json())
          .then((geocode) => {
            this.longitude.value = geocode.features[0].center[0];
            this.latitude.value = geocode.features[0].center[1];
          });
      }
    });

    this.address?.addEventListener('blur', () => {
      fetch(prefix + this.address.innerText + middle + accesstoken)
        .then((response) => response.json())
        .then((geocode) => {
          this.longitude.value = geocode.features[0].center[0];
          this.latitude.value = geocode.features[0].center[1];
        });
    });
  }

  clientSelect(event) {
    this.contactTarget.value = event.target.innerText;
  }

  handleSetClient() {}
}
