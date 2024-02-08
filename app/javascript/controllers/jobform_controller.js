import { Controller } from '@hotwired/stimulus';
import flatpickr from 'flatpickr';

// Connects to data-controller="jobform"
export default class extends Controller {
  connect() {
    let start = document.getElementById('startdate');
    let end = document.getElementById('enddate');

    const fpstart = flatpickr('#startdate', {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      onClose: function(selectedDates, dateStr, instance){
        document.getElementById('job_start').value = dateStr;
        console.log(dateStr);
      },
    });

    const fpend = flatpickr('#enddate', {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      onClose: function(selectedDates, dateStr, instance){
        document.getElementById('job_end').value = dateStr;
        console.log(dateStr);
      },
    });
  }


}
