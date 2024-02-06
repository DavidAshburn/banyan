import React from "react";

export default function Property({property}) {

  function toCap(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return(
    <div className="grid grid-cols-3 border border-dark rounded-md mx-4">
      <p>{property.property_type}</p>
      <p>{toCap(property.parking)} parking</p>
      <p>{toCap(property.tree_access)} access</p>
      <div className="col-span-full bg-emerald-200 grid grid-cols-3">
        <a
          href={'/properties/' + property.id}
          className="col-span-2 text-center p-2"
        >
          {property.address}
        </a>
        <div className="col-start-3 flex items-center justify-center gap-2 p-2">
          <a
            href={'/jobs/new?pid=' + property.id}
            className="darkbutton-s"
          >
            New Job
          </a>
        </div>
        <div className="col-start-3 flex items-center justify-center gap-2 p-2">
          <a
            href={'/maps/edit?pid=' + property.id}
            className="darkbutton-s"
          >
            Edit Map
          </a>
        </div>
      </div>
    </div>
  )
}