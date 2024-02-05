import React, { useState, useEffect } from 'react';
import ClientRow from './ClientRow';
import Windowpane from './Windowpane';
import JobRow from './JobRow';
import DashHead from './DashHead';

export default function Dashboard() {
  let [clientdata, setClientData] = useState([]);
  let [jobsdata, setJobsData] = useState([]);
  let [user, setUser] = useState({});

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

    fetch('/data/user')
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <div className="grid lg:grid-cols-[1fr_5fr]">
      <div className="row-span-full bg-green-300 max-lg:h-12">
        <div className="lg:flex lg:flex-col grid grid-cols-4 gap-2">

            <a href="/clients/new" class="text-center font-bold text-xl navlink">Add Client</a>
            <a href="/properties/new" class="text-center font-bold text-xl navlink">Add Property</a>
            <a href="/user/profile" class="text-center font-bold text-xl navlink">Profile</a>
            <a href="/user/configuration" class="text-center font-bold text-xl navlink">Config</a>

        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 text-lg bg-light text-dark font-josefin min-h-screen">
        <Windowpane title="User" content={<DashHead user={user} />} />
        <Windowpane
          title="Jobs"
          content={jobsdata.map((job, j) => (
            <JobRow jobdata={job} key={j} />
          ))}
        />
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
      </div>
    </div>
  );
}
