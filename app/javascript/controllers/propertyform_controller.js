import { Controller } from '@hotwired/stimulus';

// Connects to data-controller="propform"
export default class extends Controller {
  static targets = [
    'nameinput',
  ]
  connect() {
    this.client = {};
    this.contactTarget = document.getElementById('contactnamein');
    this.clientSelect = document.getElementById('property_client_id');

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
        });
    });

    this.propertytypeselect = document.getElementById('property_property_type');
    this.address = document.getElementById('addressin');

    this.propertytypeselect?.addEventListener("change", (event) => {
      if (this.propcount < 1 && this.client != {}) {
        console.log(this.client);
        this.address.value = this.client.mail_address;
        document.getElementById('phonein').value = this.client.phone;
        document.getElementById('emailin').value = this.client.email;
      } 
    });
  }

  clientSelect(event) {
    console.log('cselect');
    this.contactTarget.value = event.target.innerText;
  }
}
