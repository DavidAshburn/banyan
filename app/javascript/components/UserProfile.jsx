import React, {useState, useEffect, useRef} from "react"
import AddProfileTags from "./ui/AddProfileTags";




export default function UserProfile() {
    const [profile, _setProfile] = useState({});
    const profileRef = useRef();
    const setProfile = (profile) => {
        profileRef.current = profile;
        _setProfile(profile);
    }

    const [fleets, setFleets] = useState({});
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
    function removeTree(name) {
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
                    <div className="panecontent grid gap-2">
                        <AddProfileTags items={profile.species} removeTag={removeTree} addTag={addSpecies} name="Tree"/>
                        <AddProfileTags items={profile.worktypes} removeTag={removeWorktype} addTag={addWorktype} name="Work Type"/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}