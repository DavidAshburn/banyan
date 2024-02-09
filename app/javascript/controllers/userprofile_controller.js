import { Controller } from '@hotwired/stimulus';
export default class extends Controller {
  static targets = [
    'speciesin',
    'vehiclesin',
    'equipmentin',
    'pidin',
    'speciesform',
    'vehiclesform',
    'equipmentform',
    'specieslist',
    'vehicleslist',
    'equipmentlist',
  ];
  connect() {
    this.latestSpecies = [];
    this.latestVehicles = [];
    this.latestEquipment = [];

    fetch('/data/profile?pid=' + this.pidinTarget.innerText)
      .then((response) => response.json())
      .then((profile) => {
        this.latestSpecies = profile.species;
        this.latestVehicles = profile.vehicles;
        this.latestEquipment = profile.equipment;
      });
  }

  addSpecies() {
    let token = document.getElementsByName('csrf-token')[0].content;
    let input = this.speciesinTarget;

    if (input.value.length) {
      this.latestSpecies.push(input.value);
      fetch('/edit/profilespecies?name=' + input.value, {
        method: 'POST',
        headers: {
          'X-CSRF-Token': token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          /*handle POST errors*/
        });

      this.appendP(this.specieslistTarget, input.value);
    }
    console.log(this.latestSpecies);
  }

  addVehicle() {
    let token = document.getElementsByName('csrf-token')[0].content;
    let input = this.vehiclesinTarget;

    if (input.value.length) {
      this.latestVehicles.push(input.value);
    }
    fetch('/edit/profilevehicles?name=' + input.value, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        /*handle POST errors*/
      });
    this.appendP(this.vehicleslistTarget, input.value);
  }

  addEquipment() {
    let token = document.getElementsByName('csrf-token')[0].content;
    let input = this.equipmentinTarget;

    if (input.value.length) {
      this.latestEquipment.push(input.value);
    }
    fetch('/edit/profileequipment?name=' + input.value, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        /*handle POST errors*/
      });
    this.appendP(this.equipmentlistTarget, input.value);
  }

  appendP(target, content) {
    let el = document.createElement('p');
    let innerText = document.createTextNode(content);
    el.appendChild(innerText);
    target.appendChild(el);
  }

  showSpecies() {
    this.speciesformTarget.classList.toggle('hidden');
  }
  showVehicle() {
    this.vehiclesformTarget.classList.toggle('hidden');
  }
  showEquipment() {
    this.equipmentformTarget.classList.toggle('hidden');
  }
}
