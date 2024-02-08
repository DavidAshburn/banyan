import { Controller } from '@hotwired/stimulus';
import flatpickr from 'flatpickr';

// Connects to data-controller="jobform"
export default class extends Controller {
  connect() {
    const fpstart = flatpickr('#startdate', {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
    }); //
    const fpend = flatpickr('#enddate', {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
    }); // flatpickr
  }
}
