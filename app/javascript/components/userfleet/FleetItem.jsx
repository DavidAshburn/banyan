import React from "react";

export default function FleetItem({item}) {
    function updateFleet(e) {
        let form = document.getElementById(item.id);
        e.preventDefault();
        let formData = new FormData(form);
        let token = document.getElementsByName('csrf-token')[0].content;
        let fleetbody = {
            "fleet": {}
        };
        for(const pair of formData.entries()) {
            fleetbody.fleet[pair[0]] = pair[1];
        }
        console.log(fleetbody);

        fetch('/fleets/' + item.id, {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(fleetbody),
        }).then((response) => {
            if(response.ok) {
                console.log('updated')
            } else console.log('error updating');
        });

    }
    return(
        <form id={item.id} className="grid gap-2 p-2 grid-cols-2">
            <input id={`name${item.id}`} type="text" className="text-dark rounded px-2" name="name" defaultValue={item.name}></input>
            <label htmlFor={`name${item.id}`}>Name</label>
            <input id={`plate${item.id}`} type="text" className="text-dark rounded px-2" name="plate" defaultValue={item.plate}></input>
            <label htmlFor={`plate${item.id}`}>License Plate</label>
            <input id={`serial${item.id}`} type="text" className="text-dark rounded px-2" name="serial" defaultValue={item.serial}></input>
            <label htmlFor={`serial${item.id}`}>Serial #</label>
            <input id={`fuel${item.id}`} type="text" className="text-dark rounded px-2" name="fuel" defaultValue={item.fuel}></input>
            <label htmlFor={`fuel${item.id}`}>Fuel</label>
            <input id={`mpg${item.id}`} type="number" className="text-dark rounded px-2" name="milespergallon" defaultValue={item.milespergallon}></input>
            <label htmlFor={`mpg${item.id}`}>MPG</label>
            <button type="submit" onClick={updateFleet} className="w-fit px-4 py-2 border border-stone-400 bg-gradient-to-tr from-accent to-accent2 rounded text-light font-bold">Update</button>
        </form>
    )
}