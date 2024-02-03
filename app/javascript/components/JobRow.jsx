import React, { useState } from 'react';

export default function JobRow({ job }) {
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

  return (
    <div
      className="grid items-center grid-cols-2 text-center bg-white min-h-[4rem]"
      onClick={toggleItem}
    >
      <p>Start: {formatDate(job.start)}</p>
      <p>End: {formatDate(job.end)}</p>
      <p>{job.crew_size} Hands</p>
      <p>{job.est_hours} Hours</p>
      <div className={'col-span-full ' + display}>
        <div className="grid grid-cols-2">
          <p>Estimator: {job.estimator}</p>
          <p>Foreman: {job.foreman}</p>
          <p className="col-span-full">Equipment</p>
          {job.equipment.map((x, i) => (
            <p key={i}>{x}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
