import React, {useState, useEffect, useRef} from "react"
import AddProfileTags from "./ui/AddProfileTags";
import AddFleets from "./ui/AddFleets";



export default function UserProfile() {
    //listeners need the Ref to have a live reference at xxxRef.current
    const [profile, _setProfile] = useState({});
    const profileRef = useRef(profile);
    const setProfile = (profile) => {
        profileRef.current = profile;
        _setProfile(profile);
    }

    const [fleets, setFleets] = useState([]);


    let token = document.getElementsByName('csrf-token')[0].content;

    function addSpecies(e, name) {
        e.preventDefault();
        let input = document.getElementById(name);
        
        if(input.value.length) {
            fetch('/edit/profilespecies?name=' + input.value, {
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
        newprof.species = [...newprof.species, input.value];
        setProfile(newprof);
        input.value = "";
    }
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
    function removeSpecies(name) {
        let newtrees = [...profileRef.current.species.filter((item)=> item != name)];
        let newprofile = {...profileRef.current};
        newprofile.species = newtrees;
        setProfile(newprofile);

        fetch('/edit/profileremovespecies?name=' + name, {
            method: 'POST',
            headers: {
                'X-CSRF-Token':token,
            }
        })
        .then((response)=> {
            if(!response.ok) console.log('error');
        });
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
    function addFleet(e, ftype) {
        e.preventDefault();
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


    useEffect(()=> {
        fetch('/data/userprofile')
            .then((response)=> response.json())
            .then((data) => {
                setProfile(data.profile);
                setFleets(data.fleets);
        });
    }, []);

    return(
        <div className="grid lg:grid-cols-[1fr_6fr_1fr] min-h-screen bg-dark p-4">
            <div className="lg:col-start-2 min-h-[30vh]">
                <div className="mainpane">
                    <p className="panetitle">User Profile</p>
                    <div className="panecontent grid-rows-4 min-h-[50vh]">
                        <AddProfileTags items={profile.species} removeTag={removeSpecies} addTag={addSpecies} name="Tree"/>
                        <AddProfileTags items={profile.worktypes} removeTag={removeWorktype} addTag={addWorktype} name="Work Type"/>
                        <AddFleets items={fleets} removeTag={removeFleet} addTag={addFleet} ftype="Vehicle"/>
                        <AddFleets items={fleets}  removeTag={removeFleet} addTag={addFleet} ftype="Equipment"/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}