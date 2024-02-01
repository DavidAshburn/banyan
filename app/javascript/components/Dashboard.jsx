import React, {useState, useEffect} from "react";

export default function Dashboard() {

  let uid = document.getElementById('uid').innerText;
  let [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(`/data/clients`)
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
        console.log(data);
      });
  },[]);

  return(
    <div className="grid">
      <div className="flex">
        <p>Dashboard</p>
      </div>
    </div>
  )
}