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

  return (
    <div
      className="grid items-center grid-cols-4 text-center bg-white min-h-[4rem]"
      data-ref={index}
      onClick={toggleItem}
    >
      <p>{client.name}</p>
      <p>{client.email}</p>
      <p>{client.phone}</p>
      <p>{client.mail_address}</p>
      <div className={'col-span-full ' + display}>
        {properties.map((property, i) => (
          <div className="grid grid-cols-2" key={i}>
            <p>Type: {property.property_type}</p>
            <p>Parking: {property.parking}</p>
            <p>Access: {property.tree_access}</p>
            <p>
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
