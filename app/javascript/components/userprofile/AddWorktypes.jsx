import React from "react"
import RemovableModelTag from "../ui/RemovableModelTag"

export default function AddWorktypes({items, setProfile, profileRef}) {

    let token = document.getElementsByName('csrf-token')[0].content;
    let name = "Work Type";

    function addWorktype(e, name) {
        e.preventDefault();
        let input = document.getElementById(name);
        
        if(input.value.length) {
            fetch('/edit/profileworktypes?name=' + input.value, {
                method: 'POST',
                headers: {
                    'X-CSRF-Token':token,
                }
            })
            .then((response)=> {
                if(!response.ok) console.log('error');
        });
        }
        let newprof = {...profileRef.current};
        newprof.worktypes = [...newprof.worktypes, input.value];
        setProfile(newprof);
    
        input.value = "";
    }

    function removeWorktype(name) {
        let newtypes = [...profileRef.current.worktypes.filter((item)=> item != name)];
        let newprofile = {...profileRef.current};
        newprofile.worktypes = newtypes;
        setProfile(newprofile);

        fetch('/edit/profileremoveworktypes?name=' + name, {
            method: 'POST',
            headers: {
                'X-CSRF-Token':token,
            }
        })
        .then((response)=> {
            if(!response.ok) console.log('error');
        });
    }

    return(
        <div className="grid lg:grid-cols-[1fr_5fr] gap-2 py-4 px-2 lg:gap-4 border-gradient">
            <div className="lg:col-start-2 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                {items && items.map((item, i)=> (
                    <RemovableModelTag key={`${item}${i}`} label={item} removeTag={removeWorktype}/>
                ))}
            </div>
            <form action="" className="lg:col-start-1 row-start-1 max-lg:row-start-2 flex flex-col gap-2 items-start pt-4">
                <input type="text" id={name} className="text-dark max-w-52 px-2 py-[1px] rounded"/>
                <button onClick={(e)=>addWorktype(e, name)} className="bg-light text-dark text-sm text-center p-2 max-w-40">Add {name}</button>
            </form>
        </div>
    )
}