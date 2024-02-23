import { Controller } from '@hotwired/stimulus';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
// Connects to data-controller="debug"
export default class extends Controller {
  static targets = ['output'];
  connect() {
    this.calendarEl = document.getElementById('calendar');

    this.calendar = new Calendar(this.calendarEl, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      eventClick: function(info) {
        let next = `../jobs/${info.event.id}`;
        window.open(next, '_self');
      }
    });

    this.calendar.render();

    fetch('/data/getcalendar')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.calendar?.addEventSource(data);
      });
  }
}
