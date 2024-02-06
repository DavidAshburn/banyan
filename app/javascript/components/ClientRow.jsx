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
      className="grid py-4 items-center grid-cols-2 text-center min-h-[4rem] rounded-bl-lg rounded-tr-lg border border-dark rounded-md"
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
            <div className="col-span-full bg-emerald-200 grid grid-cols-3">
              <a
                href={
                  '/maps/edit?target=' +
                  property.address +
                  '&property=' +
                  property.id
                }
                className="col-start-2"
              >
                {property.address}
              </a>
              <div className="col-start-3 flex items-center justify-center gap-2 p-2">
                <a
                  href={'/jobs/new?pid=' + property.id}
                  className="darkbutton"
                >
                  New Job
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
