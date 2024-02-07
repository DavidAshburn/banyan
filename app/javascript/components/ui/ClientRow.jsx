import React, { useState } from 'react';
import PropertyRow from './PropertyRow';

export default function ClientRow({ client, properties, index }) {
  let [display, setDisplay] = useState('hidden');

  function toggleItem() {
    if (display == 'hidden') {
      setDisplay('grid');
    } else {
      setDisplay('hidden');
    }
  }

  return (
    <div
      className="grid p-4 gap-2 items-center grid-cols-[2fr_2fr_1fr] text-center min-h-[4rem] rounded-bl-lg rounded-tr-lg border border-dark rounded-md"
      data-ref={index}
      onClick={toggleItem}
    >
      <p className="row-span-2">{client.name}</p>
      <p>{client.email}</p>
      <p>{client.phone}</p>
      <div className={'grid gap-4 col-span-full ' + display}>
        
        {properties.map((location, i) => (
          <PropertyRow property={location} key={i} />
        ))}
        <div className="flex items-center justify-end pr-4">
          <a
            href={'/properties/new?cid=' + client.id}
            className="row-span-2 darkbutton-s"
          >
            Add Property
          </a>
        </div>
      </div>
    </div>
  );
}

/*
<a href={
    '/maps/edit?target=' +
    property.address +
    '&property=' +
    property.id
  }
  className="col-start-2"
>
  {property.address}
</a>
*/
