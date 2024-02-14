import React, { useState } from 'react';

export default function JobRow({ jobdata }) {
  let [display, setDisplay] = useState('hidden');

  function toggleItem() {
    if (display == 'hidden') {
      setDisplay('grid');
    } else {
      setDisplay('hidden');
    }
  }

  function formatDate(string) {
    let thisdate = new Date(string);

    let options = {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    }

    return new Intl.DateTimeFormat("en-US", options).format(thisdate);
  }

  const job = jobdata.job;
  const property = jobdata.property;
  const client = jobdata.client;

  return (
    <div
      className="grid items-center grid-cols-2 text-center min-h-[4rem] py-2 rounded-bl-lg rounded-tr-lg border border-dark rounded-md"
      onClick={toggleItem}
    >
      <p>{client.name} </p>
      <p>{job.crew_size} Hands</p>
      <p>Property: {property.name}</p>
      <p>{job.est_hours} Hours</p>

      <div className={'col-span-full ' + display}>
        <div className="grid gap-2 grid-cols-2 border border-dark rounded-md mx-4 py-2">
          <div className="grid grid-cols-2 p-2 gap-2 col-span-full border-dull rounded-md bg-accent">
            <div className="grid">
              <p className="col-span-full text-sm text-stone-500">start</p>
              <p>{formatDate(job.start)}</p>
            </div>
            <div className="grid">
              <p className="col-span-full text-sm text-stone-500">end</p>
              <p>{formatDate(job.end)}</p>
            </div>
          </div>
          <a
            href={
              '/jobs/' +
              job.id
            }
            className="col-span-full bg-accent"
          >
            {property.address}
          </a>
          <p>Estimator: {job.estimator}</p>
          <p>Foreman: {job.foreman}</p>

          <div className="grid col-span-full grid-cols-3 gap-2 border-t border-stone-400 rounded-md">
            <p className="col-span-full text-sm text-stone-500">
              vehicles
            </p>
            {job.vehicles.map((x, i) => (
              <p key={i}>{x}</p>
            ))}
            <p className="col-span-full text-sm text-stone-500">
              equipment
            </p>
            {job.equipment.map((x, i) => (
              <p key={i}>{x}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
