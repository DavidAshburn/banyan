import React, {useState, useEffect} from "react";
import ClientRow from "./ClientRow";

export default function Dashboard() {

  let uid = document.getElementById('uid').innerText;
  let [clientdata, setClientData] = useState([]);
  let [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(`/data/clients`)
      .then((response) => response.json())
      .then((data) => {
        setClientData(data);
        console.log(data.map((x)=>x[0]));
        setClients(data.map((x)=>x[0]));
      });
  },[]);

  return(
    <div className="grid">
      <p className="text-3xl font-bold">Clients</p>

      <div className="grid border-2 border-slate-300">
        {clients.map((client,i) => (
          <ClientRow client={client} index={i} key={i} />
          ))}
      </div>

    </div>
  )
}