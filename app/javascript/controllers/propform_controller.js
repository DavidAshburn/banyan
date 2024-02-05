import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="propform"
export default class extends Controller {
  connect() {
    this.contactTarget = document.getElementById('contactname');
    this.clientSelect = document.getElementById('property_client_id');

    this.clientSelect.addEventListener('change', () => {
      for(let item of this.clientSelect.children) {
        if(item.selected) this.contactTarget.value = item.text;
      }
    });
  }

  clientSelect(event) {
    console.log('cselect');
    this.contactTarget.value = event.target.innerText;
  }

}
