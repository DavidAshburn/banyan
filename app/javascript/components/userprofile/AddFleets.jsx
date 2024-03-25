import React from "react";
import RemovableModelTag from "../ui/RemovableModelTag";

export default function AddFleets({items, ftype, setFleets}) {

    function addFleet(e, ftype) {
        e.preventDefault();
        let token = document.getElementsByName('csrf-token')[0].content;
        let name = document.getElementById(ftype).value;

        if(name.length) {
            fetch('/fleets', {
                method: 'POST',
                headers: {
                    'X-CSRF-Token':token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "fleet": {
                        "name": name,
                        "fleettype": ftype
                    },
                }),
            })
                .then((response)=> {
                    if(response.ok) {
                        response.json().then((data)=> {
                            setFleets(data);
                        })
                    }else console.log('error');
            });
        }
        document.getElementById(ftype).value = "";
    }
    function removeFleet(item) {
        let token = document.getElementsByName('csrf-token')[0].content;
        
        fetch('/fleets/' + item.id, {
            method: 'DELETE',
            headers: {
                'X-CSRF-Token':token,
            },
        })
            .then((response)=> {
                if(response.ok) {
                    response.json().then((data)=> {
                        setFleets(data);
                    })
                }else console.log('error');
        });
    }

    return(
        <div className="grid lg:grid-cols-[1fr_5fr] gap-2 py-4 px-2 lg:gap-4 border-gradient">
            <div className="lg:col-start-2 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 grid-rows-auto">
                {items && items.filter((item)=>item.fleettype === ftype).map((item, i)=> (
                    <RemovableModelTag key={`${item.name}${i}`} label={item.name} removeTag={()=>removeFleet(item)}/>
                ))}
            </div>
            <form action="" className="lg:col-start-1 row-start-1 max-lg:row-start-2 flex flex-col gap-2 items-start pt-4">
                <input type="text" id={ftype} className="text-dark max-w-52 px-2 py-[1px] rounded"/>
                <button onClick={(e)=>addFleet(e, ftype)} className="bg-light text-dark text-sm text-center p-2 max-w-40">Add {ftype}</button>
            </form>
        </div>
    )
}