import { Controller } from '@hotwired/stimulus';

// Connects to data-controller="propertyform"
export default class extends Controller {
  static targets = ['nameinput'];
  connect() {
    this.client = {};
    this.contactnameIn = document.getElementById('contactnamein');
    this.clientidIn = document.getElementById('property_client_id');
    this.propertytypeIn = document.getElementById(
      'property_property_type'
    );
    this.addressIn = document.getElementById('addressin');
    this.latitudeIn = document.getElementById('forminlatitude');
    this.longitudeIn = document.getElementById('forminlongitude');
    this.phoneIn = document.getElementById('phonein');
    this.emailIn = document.getElementById('emailin');

    const prefix =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const middle = '.json?access_token=';
    const accesstoken =
      'pk.eyJ1Ijoia3B0a251Y2tsZXMiLCJhIjoiY2xydG93aW95MDhzaTJxbzF2N2Y4ZTd5eSJ9.gmMbs4w6atuaUiqplL_74w';

      //geocode the address field when focus is lost
    this.addressIn?.addEventListener('blur', (event) => {
      fetch(prefix + event.target.value + middle + accesstoken)
        .then((response) => response.json())
        .then((geocode) => {
          if (geocode.features.length > 0) {
            this.longitudeIn.value = geocode.features[0].center[0];
            this.latitudeIn.value = geocode.features[0].center[1];
          }
        });
    });

    //check route source -- EventListener unneeded if <select> is not used in the form
    if (window.location.search.length == 0) {
      //autofill correct client's data when client <select> is changed
      this.clientidIn.addEventListener('change', () => {
        fetch('/data/client?cid=' + this.clientidIn.value)
          .then((response) => response.json())
          .then((data) => {
            this.client = data.client;
            this.contactnameIn.value = this.client.name;
            this.phoneIn.value = this.client.phone;
            this.emailIn.value = this.client.email;
            if(data.property_count < 1) {
              this.addressIn.value = this.client.mail_address;
              fetch(prefix + this.addressIn.value + middle + accesstoken)
              .then((response) => response.json())
              .then((geocode) => {
                if (geocode.features.length > 0) {
                  this.longitudeIn.value = geocode.features[0].center[0];
                  this.latitudeIn.value = geocode.features[0].center[1];
                }
              });
            }
          });
      });
    } else {
      //path with cid given in search parameters
      let client_id = window.location.search.split('=')[1];
      fetch('/data/client?cid=' + client_id)
        .then((response) => response.json())
        .then((data) => {
          this.client = data.client;
          this.contactnameIn.value = this.client.name;
          this.phoneIn.value = this.client.phone;
          this.emailIn.value = this.client.email;
          if(data.property_count < 1) {
            this.addressIn.value = this.client.mail_address;
            fetch(prefix + this.addressIn.value + middle + accesstoken)
            .then((response) => response.json())
            .then((geocode) => {
              if (geocode.features.length > 0) {
                this.longitudeIn.value = geocode.features[0].center[0];
                this.latitudeIn.value = geocode.features[0].center[1];
              }
            });
          }
        });
    }

    //geocode the address field when focus is lost
    this.addressIn?.addEventListener('blur', (event) => {
      fetch(prefix + event.target.value + middle + accesstoken)
        .then((response) => response.json())
        .then((geocode) => {
          if (geocode.features.length > 0) {
            this.longitudeIn.value = geocode.features[0].center[0];
            this.latitudeIn.value = geocode.features[0].center[1];
          }
        });
    });
  }
}
