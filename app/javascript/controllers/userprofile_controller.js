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

      this.appendP(this.specieslistTarget, input.value, this.latestSpecies.length - 1, 'species');
      this.clearInputs();
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
    this.appendP(this.vehicleslistTarget, input.value, this.latestVehicles.length - 1, 'vehicles');
    this.clearInputs();
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
    this.appendP(this.equipmentlistTarget, input.value, this.latestEquipment.length - 1, 'equipment');
    this.clearInputs();
  }

  removeItem(event) {
    let token = document.getElementsByName('csrf-token')[0].content;
    let removeTarget = event.target.parentElement.firstElementChild;
    let index = removeTarget.dataset.itemindex;
    let type = removeTarget.dataset.itemtype;

    fetch('/edit/profileremove' + type + '?index=' + index, {
      method: "POST", 
      headers: {
      'X-CSRF-Token': token,
      },
    })
    .then((response) => response.json())
      .then((data) => {
        console.log(data);
        /*handle POST errors*/
      });

    event.target.parentElement.remove();
  }

  clearInputs() {
    this.speciesinTarget.value = "";
    this.vehiclesinTarget.value = "";
    this.equipmentinTarget.value = "";
  }

  appendP(target, content, itemindex, itemtype) {
    let container = document.createElement('div');
    container.classList.add('flex','gap-2');
    let el = document.createElement('p');
    el.dataset.itemindex = itemindex; //used for removing items
    el.dataset.itemtype = itemtype;
    
    let innerText = document.createTextNode(content);
    el.appendChild(innerText);
    
    let button = document.createElement('button');
    let inner = document.createTextNode('x');
    button.appendChild(inner);

    button.dataset.action="userprofile#removeItem";
    button.classList.add('w-4','h-4','rounded-full','flex','justify-center','items-center','bg-dark','text-light');
    
    container.appendChild(el);
    container.appendChild(button);
    target.appendChild(container);
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
