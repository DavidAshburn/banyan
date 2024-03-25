import React from "react";

export default function ZoneChecks({property}) {

    return(
        <div className="grid gap-2 p-2" id="treezones">
            {property.zones && property.zones.map((zone, i) => (
                <div className="grid grid-cols-2 gap-2" key={zone + "check"}>
                    <input type="checkbox" name={zone} id={zone + "check"} />
                    <label htmlFor={zone + "check"} className="text-light">{zone}</label>
                </div>
            ))}
        </div>
    )
}