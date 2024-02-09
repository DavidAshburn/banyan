import React, { useState, useEffect } from 'react';
import Windowpane from './ui/Windowpane';

export default function Profile() {
  let [profile, setProfile] = useState({});

  useEffect(() => {
    fetch(`/data/profile`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      });
  }, []);

  function addSpecies(event) {
    document
      .getElementById('speciesform')
      ?.classList.toggle('hidden');
  }
  function addVehicle(event) {
    document
      .getElementById('Vehicleform')
      ?.classList.toggle('hidden');
  }
  function addEquipment(event) {
    document
      .getElementById('equipmentform')
      ?.classList.toggle('hidden');
  }

  return <div></div>;
}
