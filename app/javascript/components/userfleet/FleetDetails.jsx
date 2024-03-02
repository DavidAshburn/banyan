import React from "react";
import FleetItem from "./FleetItem";

export default function FleetDetails({fleettype, items}) {

    return(
        <div className="grid gap-2">
            <p className="col-span-full font-bold">{fleettype} Details</p>
            <div className="grid p-2 gap-2 grid-cols-2">
                {items.map((item) => (
                    <FleetItem key={fleettype + item.id} item={item} />
                ))}
            </div>
        </div>
            
    )
}