import { Controller } from '@hotwired/stimulus';

// Connects to data-controller="propform"
export default class extends Controller {
  connect() {
    this.client = {};
    this.contactTarget = document.getElementById('contactname');
    this.clientSelect = document.getElementById('property_client_id');

    this.clientSelect.addEventListener('change', () => {
      let selectedclient = '';
      for (let item of this.clientSelect.children) {
        if (item.selected) selectedclient = item;
      }

      this.contactTarget.value = selectedclient.text;

      fetch('/data/client?cid=' + selectedclient.value)
        .then((response) => response.json())
        .then((data) => {
          this.client = data.client;
          this.propcount = data.property_count;
        });
    });

    this.propertytypeselect = document.getElementById(
      'propertytypeselect'
    );
    this.address = document.getElementById('address');

    this.propertytypeselect?.addEventListener('blur', () => {
      if (
        this.propertytypeselect.value == 'Home' ||
        this.propertytypeselect.value == 'Attached'
      ) {
        if (this.propcount < 1) {
          console.log('first');
        }
      }
    });
  }

  clientSelect(event) {
    console.log('cselect');
    this.contactTarget.value = event.target.innerText;
  }
}
