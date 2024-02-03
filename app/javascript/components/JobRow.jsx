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
    let thisdate = new Date();

    let datetime = string.split('T');
    let dateparts = datetime[0].split('-');
    let timeparts = datetime[1].split(':');

    thisdate.setFullYear(dateparts[0]);
    thisdate.setMonth(dateparts[1]);
    thisdate.setDate(dateparts[2]);
    thisdate.setHours(timeparts[0]);
    thisdate.setMinutes(timeparts[1]);
    thisdate.setSeconds(0);

    return thisdate.toLocaleString();
  }

  const job = jobdata.job;
  const property = jobdata.property;
  const client = jobdata.client;

  return (
    <div
      className="grid items-center grid-cols-2 text-center min-h-[4rem] py-2 rounded-bl-lg rounded-tr-lg border border-dark rounded-md"
      onClick={toggleItem}
    >
      <p>Client: {client.name} </p>
      <p>{job.crew_size} Hands</p>
      <p>Property: {property.name}</p>
      <p>{job.est_hours} Hours</p>

      <div className={'col-span-full ' + display}>
        <div className="grid gap-2 grid-cols-2 border border-dark rounded-md mx-4 py-2">
          <div className="grid grid-cols-2 p-2 gap-2 col-span-full border-dull rounded-md bg-emerald-200">
            <p>Start: {formatDate(job.start)}</p>
            <p>End: {formatDate(job.end)}</p>
          </div>
          <p>Estimator: {job.estimator}</p>
          <p>Foreman: {job.foreman}</p>

          <div className="grid col-span-full grid-cols-3 gap-2 border-t border-stone-400 rounded-md">
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
