import React, { useState } from 'react';

export default function ClientRow({ client, properties, index }) {
  let [display, setDisplay] = useState('hidden');

  function toggleItem() {
    if (display == 'hidden') {
      setDisplay('grid');
    } else {
      setDisplay('hidden');
    }
  }

  function toCap(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div
      className="grid py-4 items-center grid-cols-2 text-center min-h-[4rem] rounded-bl-lg rounded-tr-lg"
      data-ref={index}
      onClick={toggleItem}
    >
      <p className="row-span-2">{client.name}</p>
      <p>{client.email}</p>
      <p>{client.phone}</p>
      <div className={'grid gap-4 col-span-full ' + display}>
        {properties.map((property, i) => (
          <div
            className="grid grid-cols-3 border border-dark rounded-md mx-4"
            key={i}
          >
            <p>{property.property_type}</p>
            <p>{toCap(property.parking)} parking</p>
            <p>{toCap(property.tree_access)} access</p>
            <p className="col-span-full">
              Address:{' '}
              <a
                href={
                  '/maps/find?target=' +
                  property.address +
                  '&property=' +
                  property.id
                }
              >
                {property.address}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
