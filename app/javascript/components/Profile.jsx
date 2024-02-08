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

  return (
    <div className="grid lg:grid-cols-[1fr_6fr_1fr] min-h-screen bg-dark p-4 bg-light">
      <div className="lg:col-start-2 min-h-[30vh]">
        <div className="windowpanedark">
          <p>User Profile</p>
          <div>
            <div className="grid grid-rows-5">
              <p className="rounded border-b border-stone-50">
                Name: {profile.name}
              </p>
              <div className="grid gap-2">
                <p className="rounded border-b border-stone-50">
                  Species Saved:
                </p>
                {profile.species ? (
                  profile?.species.map((specie) => <p>{specie}</p>)
                ) : (
                  <div></div>
                )}
              </div>
              <div className="grid gap-2">
                <p className="rounded border-b border-stone-50">
                  Vehicles:
                </p>
                {profile.vehicles ? (
                  profile.vehicles.map((truck) => <p>{truck}</p>)
                ) : (
                  <div></div>
                )}
              </div>
              <div className="grid gap-2">
                <p className="rounded border-b border-stone-50">
                  Equipment:
                </p>
                {profile.equipment ? (
                  profile.equipment.map((item) => <p>{item}</p>)
                ) : (
                  <div></div>
                )}
              </div>
              <a href="/user/dashboard" className="darkbutton">
                Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
