import React from "react";
import ZoneChecks from "./ZoneChecks";

export default function AddTreeModal({formmodal, property, addTree}) {

    return(
        <dialog id="treeform" ref={formmodal}>
            <div className="grid gap-2 p-4 w-fit h-fit bg-dark">
                <label htmlFor="speciesin" className="text-center p-2 text-light">Species</label>
                <input type="text" name="species" id="speciesin"/>
                <label htmlFor="dbhin" className="text-center p-2 text-light">Trunk Diameter</label>
                <input type="text" name="dbh" id="dbhin"/>
                <label htmlFor="crownin" className="text-center p-2 text-light">Crown</label>
                <input type="text" name="crown" id="crownin"/>
                <label className="text-center p-2 text-light">Zone</label>
                <ZoneChecks property={property} />
                <label htmlFor="notesin" className="text-center p-2 text-light">Notes</label>
                <input type="text" name="notes" id="notesin"/>
                <button onClick={addTree} className="lightbutton">Save Tree</button>
                <button onClick={()=>formmodal.current.close()} className="lightbutton">Close</button>
            </div>
        </dialog>
    )
}