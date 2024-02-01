import React, { useState, useEffect } from 'react';
import ClientRow from './ClientRow';
import Windowpane from './Windowpane';

export default function Dashboard() {
  let uid = document.getElementById('uid').innerText;
  let [clientdata, setClientData] = useState([]);
  let [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(`/data/clients`)
      .then((response) => response.json())
      .then((data) => {
        setClientData(data);
        setClients(data.map((x) => x[0]));
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
    </div>
  );
}
