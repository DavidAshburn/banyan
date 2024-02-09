import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="debug"
export default class extends Controller {
  static targets = [
    'output',
  ]
  connect() {
    /*
    fetch('/data/getproperties')
    .then((response) => response.json())
    .then((data) => { 
      console.log(data);
    });
  */
  }
  
}
