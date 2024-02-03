import React, { useState, useEffect } from 'react';
import ClientRow from './ClientRow';
import Windowpane from './Windowpane';
import JobRow from './JobRow';

export default function Dashboard() {
  let [clientdata, setClientData] = useState([]);
  let [jobsdata, setJobsData] = useState([]);

  useEffect(() => {
    fetch(`/data/clients`)
      .then((response) => response.json())
      .then((data) => {
        setClientData(data);
      });
    
    fetch('/data/jobs')
    .then((response) => response.json())
    .then((data) => {
      setJobsData(data);
    });
  }, []);

  return (
    <div className="grid gap-4 p-4 text-lg bg-light text-dark font-josefin min-h-screen">
      <Windowpane
        title="Clients"
        content={clientdata.map((client, i) => (
          <ClientRow
            client={client[0]}
            properties={client[1]}
            index={i}
            key={i}
          />
        ))}
      />
      <Windowpane
        title="Jobs"
        content={jobsdata.map((job, i) => (
          <JobRow
            job={job}
            index={i}
            key={i}
          />
        ))}
      />
    </div>
  );
}
