import React, { useState, useEffect } from 'react';
import ClientRow from './ui/ClientRow';
import DashHead from './ui/DashHead';
import JobRow from './ui/JobRow';
import Windowpane from './ui/Windowpane';


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
      <div className="row-span-full bg-dark max-lg:min-h-12">
        <div className="lg:flex lg:flex-col grid grid-cols-4">
          <a href="/clients/new" className="navlink">
            +Client
          </a>
          <a href="/properties/new" className="navlink">
            +Property
          </a>
          <a href="/user/profile" className="navlink">
            Profile
          </a>
          <a href="/user/configuration" className="navlink">
            Config
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 text-lg bg-light text-dark font-josefin min-h-screen">
        <div
          className="grid md:grid-cols-2 bg-dark"
          data-controller="dashjobsmap"
        >
          <div id="jobsmap" className="min-h-80"></div>
          <Windowpane
          title="Jobs"
          content={jobsdata.map((job, j) => (
            <JobRow jobdata={job} key={j} />
          ))}
          light = '0'
        />
        </div>
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
          light = '0'
        />
        <Windowpane
          title={user.email}
          content={<DashHead user={user} />}
          light = '0'
        />
      </div>
    </div>
  );
}
