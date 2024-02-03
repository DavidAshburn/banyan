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
    <div className="flex flex-col gap-4 p-4 text-lg bg-teal-300 text-dark font-josefin min-h-screen">
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
        content={jobsdata.map((job, j) => (
          <JobRow jobdata={job} key={j} />
        ))}
      />
    </div>
  );
}
