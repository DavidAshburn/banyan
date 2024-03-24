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
                
            //set non-Renewable parameters on the submission data object
            if(!ignore){
                fleetbody.fleet[pair[0]] = pair[1];
            }
            //set local variables for new renewable title and value if present
            if(pair[0] == "renewabletitlenew") {
                newrenewabletitle = pair[1];
            }
            if(pair[0] == 'renewablevaluenew') {
                newrenewablevalue = pair[1];
            }
        }

        //local variable to collect old and new renewables all together, 
        //due to data structure we have to submit all of them to CRUD a member
        let newobj = {};

        //pop newobj with newtitle:newvalue if a title present
        if(newrenewabletitle.length && newrenewabletitle.length > 0) {
            newobj[newrenewabletitle] = newrenewablevalue;
        };

        //collect current input values of existing item.renewables
        for(const pair of formData.entries()) {
            let pattern = pair[0].slice(0,17);
            if(pattern === "existingrenewable") {
                let index = pair[0].slice(17);
                
                for(const subpair of formData.entries()) {
                    if(subpair[0] === `existingdate${index}`) {
                        newobj[pair[1]] = subpair[1];
                    }
                };
            }
        };

        //collect tempitems input since the last refresh
        let tempitemframe = document.getElementById(`tempitems${item.id}`);
        for(let el of tempitemframe.children) {
            let text = el.innerText.split(' : ');
            newobj[text[0]] = text[1];
        }

        
        //remove undefined key/value pairs from renewable collection object
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
                if(newrenewabletitle !== "") {
                    const frame = document.getElementById(`tempitems${item.id}`);
                    const line = document.createElement('p');
                    line.innerText = `${newrenewabletitle} : ${newrenewablevalue}`;
                    frame.appendChild(line);
                    document.getElementById('newvalue' + item.id).value = "";
                    document.getElementById('newtitle' + item.id).value = "";
                }
                    
            } else console.log('error updating renewable');
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
            } else console.log('error removing renewable');
        });

        setRenewables(newrenewables);
    }


    function preventEnter(event) {
        event.key === 'Enter' && updateFleet(event);
    }
    return(
        <form id={item.id} className="grid gap-2 p-2 grid-cols-2 rounded border border-accent" onKeyDown={preventEnter}>
            <input id={`name${item.id}`} type="text" className="text-dark rounded px-2" name="name" defaultValue={item.name}></input>
            <label htmlFor={`name${item.id}`}>Name</label>
            <input id={`plate${item.id}`} type="text" className="text-dark rounded px-2" name="plate" defaultValue={item.plate}></input>
            <label htmlFor={`plate${item.id}`}>License Plate</label>
            <input id={`serial${item.id}`} type="text" className="text-dark rounded px-2" name="serial" defaultValue={item.serial}></input>
            <label htmlFor={`serial${item.id}`}>Serial #</label>
            <input id={`fuel${item.id}`} type="text" className="text-dark rounded px-2" name="fuel" defaultValue={item.fuel}></input>
            <label htmlFor={`fuel${item.id}`}>Fuel</label>

            <Renewables fleetitem={item} renewables={renewables} removeRenewable={removeRenewable}/>
            <button type="submit" onClick={updateFleet} className="w-fit col-span-full mt-2 px-4 py-2 border border-stone-400 bg-gradient-to-tr from-accent to-accent2 rounded text-light font-bold">Update</button>        
        </form>
    )
}