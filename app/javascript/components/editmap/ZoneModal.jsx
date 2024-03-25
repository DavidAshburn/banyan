import React from "react";
import RemovableModelTag from "../ui/RemovableModelTag";

export default function ZoneModal({zonemodal, property, setProperty}) {

    function addZone() {
        const token = document.getElementsByName('csrf-token')[0].content;
        const zname = document.getElementById('zonenamein').value;

        fetch('/edit/addzone?zname=' + zname + '&pid=' + property.id, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': token,
              }
        }).then((response) => {
            if(response.ok) {
                fetch('/properties/' + property.id + '.json')
                .then((response) => response.json())
                .then((data) => {
                    setProperty(data);
                })
            }
        });

        document.getElementById('zonenamein').value = "";
        document.getElementById('zoneform').close();
    }

    function removeZone(zonename) {
        const token = document.getElementsByName('csrf-token')[0].content;
        fetch('/edit/removezone?zname=' + zonename + '&pid=' + property.id, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': token,
            }
        }).then((response) => {
            if(response.ok) {
                fetch('/properties/' + property.id + '.json')
                .then((response) => response.json())
                .then((data) => {
                    setProperty(data);
                })
            }
        })
    }

    return(
        <dialog id="zoneform" ref={zonemodal}>
            <div className="grid gap-2 p-4 w-fit h-fit bg-dark">
                <div className="grid gap-2 p-2 text-light">
                    {property.zones && property.zones.map((zone) => (
                        <RemovableModelTag key={zone} label={zone} removeTag={removeZone}/>
                    ))}
                </div>
                <label htmlFor="zonenamein" className="text-center p-2 text-light">Zone Name</label>
                <input type="text" name="zonenamein" id="zonenamein"/>
                <button onClick={addZone} className="lightbutton">Add Zone</button>
                <button onClick={()=>zonemodal.current.close()} className="lightbutton">Close</button>
            </div>
        </dialog>
    )
}