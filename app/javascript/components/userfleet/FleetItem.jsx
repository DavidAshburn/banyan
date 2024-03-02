import React, {useState,useEffect} from "react";
import Renewables from "./Renewables";

export default function FleetItem({item}) {
    const [renewables, setRenewables] = useState([])
    useEffect(()=> {
        let theseRenewables = [];
        for(let [key,value] of Object.entries(item.renewables)) {
            theseRenewables.push([key,value]);
        }
        setRenewables(theseRenewables);
    }, [item]);
        

    function updateFleet(e) {
        let form = document.getElementById(item.id);
        e.preventDefault();
        let formData = new FormData(form);
        let token = document.getElementsByName('csrf-token')[0].content;
        let fleetbody = {
            "fleet": {}
        };

        let newrenewabletitle, newrenewablevalue = "";
        for(const pair of formData.entries()) {
            let ignore = false
            if(pair[0] == "renewabletitlenew" || 
                pair[0] == "renewablevaluenew" ||
                pair[0].slice(0,pair[0].length-1) == "existingdate" ||
                pair[0].slice(0,pair[0].length-1) == "existingrenewable") {
                    ignore = true;
                }
            //set basic parameter
            if(!ignore){
                fleetbody.fleet[pair[0]] = pair[1];
            }
            //set new renewable values
            if(pair[0] == "renewabletitlenew") {
                newrenewabletitle = pair[1];
            }
            if(pair[0] == 'renewablevaluenew') {
                newrenewablevalue = pair[1];
            }
        }

        let newobj = {};

        if(newrenewabletitle.length) {
            newobj[newrenewabletitle] = newrenewablevalue;
        };

        let existingrenewables = {};

        //collect current input values of existing item.renewables
        for(const pair of formData.entries()) {
            let pattern = pair[0].slice(0,-1);
            if(pattern === "existingrenewable") {
                let index = pair[0].slice(-1);
                for(const subpair of formData.entries()) {
                    if(subpair[0] === `existingdate${index}`) {
                        newobj[pair[1]] = subpair[1];
                    }
                };
            }
        };
        
        const cleanData = Object.entries(newobj)
        .filter(([key,value]) => value !== undefined)
        .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});

        fleetbody.fleet['renewables'] = cleanData;
        
        fetch('/fleets/' + item.id, {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(fleetbody),
        }).then((response) => {
            if(response.ok) {
                console.log('updated');
                if(newrenewabletitle !== "") {
                    const frame = document.getElementById(`tempitems${item.id}`);
                    const line = document.createElement('p');
                    line.innerText = `${newrenewabletitle} : ${newrenewablevalue}`;
                    frame.appendChild(line);
                }
                    
            } else console.log('error updating');
        });
    }
    function removeRenewable(name) {
        let token = document.getElementsByName('csrf-token')[0].content;
        let updated = {};
        let newrenewables = [];
        renewables.forEach((item) => {
            if(item[0] !== name) {
                updated[item[0]] = item[1];
                newrenewables.push(item);
            }
        })

        const fleetbody = {
            "fleet": {
                "renewables" : updated,
            } 
        };

        fetch('/fleets/' + item.id, {
            method: 'PUT',
            headers: {
                'X-CSRF-Token': token,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(fleetbody),
        }).then((response) => {
            if(response.ok) {
                console.log('updated');                    
            } else console.log('error updating');
        });

        setRenewables(newrenewables);
    }
    return(
        <form id={item.id} className="grid gap-2 p-2 grid-cols-2 rounded border border-accent">
            <input id={`name${item.id}`} type="text" className="text-dark rounded px-2" name="name" defaultValue={item.name}></input>
            <label htmlFor={`name${item.id}`}>Name</label>
            <input id={`plate${item.id}`} type="text" className="text-dark rounded px-2" name="plate" defaultValue={item.plate}></input>
            <label htmlFor={`plate${item.id}`}>License Plate</label>
            <input id={`serial${item.id}`} type="text" className="text-dark rounded px-2" name="serial" defaultValue={item.serial}></input>
            <label htmlFor={`serial${item.id}`}>Serial #</label>
            <input id={`fuel${item.id}`} type="text" className="text-dark rounded px-2" name="fuel" defaultValue={item.fuel}></input>
            <label htmlFor={`fuel${item.id}`}>Fuel</label>

            <input id={`mpg${item.id}`} type="number" className={item.fleettype == "Vehicle" ? "text-dark rounded px-2" : "hidden"} name="milespergallon" defaultValue={item.milespergallon}></input>
            <label htmlFor={`mpg${item.id}`} className={item.fleettype == "Vehicle" ? "" : "hidden"}>MPG</label>

            <Renewables fleetitem={item} renewables={renewables} removeRenewable={removeRenewable}/>
            <button type="submit" onClick={updateFleet} className="w-fit col-span-full mt-2 px-4 py-2 border border-stone-400 bg-gradient-to-tr from-accent to-accent2 rounded text-light font-bold">Update</button>        </form>
    )
}