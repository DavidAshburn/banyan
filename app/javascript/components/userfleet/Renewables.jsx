import React from "react";

export default function Renewables({fleetitem, renewables}){

    return(
        <div id="renewablesframe" className="grid gap-2 pl-2">
            <p className="col-span-full">Renewables</p>
            {renewables.map((renewable, i) => (
                <div className="grid col-span-2 grid-cols-2 gap-2" key={`${fleetitem.id}${i}`}>
                    <input type="text" className="text-dark" name={"existingrenewable" + i} defaultValue={renewable[0]}/>
                    <input type="date" className="text-dark" name={"existingdate" + i} defaultValue={renewable[1]}/>
                </div>
            ))}
            <div id={"tempitems" + fleetitem.id} className="-my-2"></div>
            <div className="grid">
                <label htmlFor="newtitle">Name</label>
                <input type="text" id="newtitle" name="renewabletitlenew" className="text-dark"/>
                <label htmlFor="newvalue" className="mt-2">Date</label>
                <input type="date" id="newvalue" name="renewablevaluenew" className="text-dark"/>
            </div>
        </div>
    )
}