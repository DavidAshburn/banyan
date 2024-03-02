import React from "react";

export default function FleetChecks({fleet, fleettype}) {
    const lowertype = fleettype.toLowerCase(); 
    let plural = fleettype;
    if(fleettype == "Vehicle") plural = plural + 's';

    return(
        <div className="col-span-full">
            <label>{plural}</label>
            <div className="grid grid-cols-2 gap-2 p-2" id={`${lowertype}checks`}>
            {fleet.filter((item)=> item.fleettype === fleettype).map((fleetitem, i) => 
                <div className="flex justify-between items-center text-end p-2 bg-accent text-light rounded" key={fleetitem.id}>
                <input type="checkbox" value={fleetitem.name}/>
                <p>{fleetitem.name}</p>
                </div>
            )}
            </div>
        </div>
    )
}