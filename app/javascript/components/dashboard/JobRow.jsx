import React, { useState } from 'react';

export default function JobRow({ jobdata, index }) {
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

  let color = "bg-stone-800";
  if(index % 2 == 0) color = "bg-stone-900";

  return (
    <div
      className={"grid items-center grid-cols-2 text-center min-h-[4rem] py-2 rounded-bl-lg rounded-tr-lg border border-dark rounded-md " + color}
      onClick={toggleItem}
    >
      <p>{client.name} </p>
      <p className="text-sm">{job.crew_size} Hands</p>
      <p className="text-sm text-stone-600">{property.name}</p>
      <p className="text-sm">{job.est_hours} Hours</p>

      <div className={'col-span-full ' + display}>
        <div className="grid gap-2 grid-cols-2 border border-dark rounded-md mx-4 p-2 bg-stone-700">
          <div className="grid grid-cols-2 p-2 gap-2 col-span-full border-dull rounded-md">
            <div className="grid">
              <p className="col-span-full text-sm text-stone-400">Start</p>
              <p className="text-sm">{formatDate(job.start)}</p>
            </div>
            <div className="grid">
              <p className="col-span-full text-sm text-stone-400">End</p>
              <p className="text-sm">{formatDate(job.end)}</p>
            </div>
          </div>
          <a
            href={
              '/properties/' +
              property.id
            }
            className="flex items-center justify-center rounded-md text-sm border-2 border-dark mx-4 py-2"
          >
            {property.address}
          </a>
          <a
            href={
              '/jobs/' +
              job.id
            }
            className="flex items-center justify-center rounded-md border-2 border-dark w-fit px-4 mx-auto"
          >
            View Job
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
