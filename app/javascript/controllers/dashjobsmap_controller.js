import { Controller } from '@hotwired/stimulus';

// Connects to data-controller="dashjobsmap"
export default class extends Controller {
  connect() {
    console.log('dashjobsmap');
  }
}
