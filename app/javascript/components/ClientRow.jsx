import React, {useState} from "react";

export default function ClientRow({client, index}) {

  let [display, setDisplay] = useState('hidden');
  let [opened, setOpened] = useState(false);

  function toggleItem() {
    console.log('trigger');
    if(!opened) {
      setDisplay('grid');
      setOpened(true);
    } else {
      setDisplay('hidden');
      setOpened(false);
    }
  }
  
  return(
    <div className="grid items-center grid-cols-4 text-center bg-white" data-ref={index} onClick={toggleItem}>
      <p>{client.name}</p>
      <p>{client.email}</p>
      <p>{client.phone}</p>
      <p>{client.mail_address}</p>
      <div className={'grid-cols-2 col-span-4' + display}>
        <p>stuff</p>
        <p>stuff</p>
        <p>stuff</p>
        <p>stuff</p>
        <p>stuff</p>
      </div>
    </div>
  )
}