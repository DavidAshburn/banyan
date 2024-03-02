import React from "react";

export default function Renewables({fleetitem, renewables, removeRenewable}){

    return(
        <div id="renewablesframe" className="grid gap-2 pl-2">
            <p className="col-span-full">Renewables</p>
            {renewables.map((renewable, i) => (
                <div className="grid col-span-full grid-cols-[1fr_1fr_3rem] gap-2" key={`${fleetitem.id}${i}`}>
                    <input type="text" className="text-dark" name={"existingrenewable" + i} defaultValue={renewable[0]}/>
                    <input type="date" className="text-dark" name={"existingdate" + i} defaultValue={renewable[1]}/>
                    <button className="bg-cross w-4 h-4" onClick={()=>removeRenewable(renewable[0])}></button>
                </div>
            ))}
            <div id={"tempitems" + fleetitem.id} className="-my-2"></div>
            <div className="grid grid-cols-[1fr_3.5rem]">
                <label className="col-start-1" htmlFor="newtitle">Name</label>
                <input className="col-start-1 text-dark" type="text" id="newtitle" name="renewabletitlenew"/>
                <label className="col-start-1 mt-2" htmlFor="newvalue">Date</label>
                <input className="col-start-1 text-dark" type="date" id="newvalue" name="renewablevaluenew"/>
            </div>
        </div>
    )
}