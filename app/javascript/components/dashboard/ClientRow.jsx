import React, { useState } from 'react';
import PropertyRow from '../ui/PropertyRow';

export default function ClientRow({ client, properties, index }) {
  let [display, setDisplay] = useState('hidden');

  function toggleItem() {
    if (display == 'hidden') {
      setDisplay('grid');
    } else {
      setDisplay('hidden');
    }
  }

  let color = "bg-stone-800";
  if(index % 2 == 0) color = "bg-stone-900";

  return (
    <div
      className={"grid px-4 py-2 gap-2 items-center sm:grid-cols-[2fr_2fr_1fr] text-center min-h-[2rem] rounded-bl-lg rounded-tr-lg border border-dark rounded-md " + color}
      data-ref={index}
      onClick={toggleItem}
    >
      <p className="row-span-2">{client.name}</p>
      <p className="text-sm">{client.email}</p>
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
