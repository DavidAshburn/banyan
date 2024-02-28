import React from "react";

export default function Property({property}) {

  function toCap(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return(
    <div className="grid sm:grid-cols-3 border-2 border-dark rounded-md mx-4 bg-stone-900">
      <p className="text-stone-400">{property.property_type}</p>
      <p className="text-stone-400">{toCap(property.parking)} parking</p>
      <p className="text-stone-400">{toCap(property.tree_access)} access</p>
      <div className="col-span-full bg-stone-700 grid sm:grid-cols-3 items-center">
        <a
          href={'/properties/' + property.id}
          className="sm:col-span-2 text-center p-2 underline"
        >
          {property.address}
        </a>
        <div className="sm:col-start-3 flex items-center justify-center gap-2 p-2">
          <a
            href={'/jobs/new?pid=' + property.id}
            className="p-2 rounded bg-dark text-light font-bold text-sm text-center w-fit"
          >
            New Job
          </a>
          <a
            href={'/maps/edit?pid=' + property.id}
            className="p-2 rounded bg-light text-dark font-bold text-sm text-center w-fit border-2 border-stone-900"
          >
            Edit Map
          </a>
        </div>
      </div>
    </div>
  )
}