import React, {useState, useEffect, useRef} from "react"
import ProfileTag from "./ui/ProfileTag";


function removeTree() {
    console.log('remove species');
}
function removeWorktype() {
    console.log('remove work');
}

export default function UserProfile() {
    //addSpecies/Worktype listeners get a stale reference through closure to profile state, need the ref.current
    const [profile, _setProfile] = useState({});
    const profileRef = useRef();
    const setProfile = (profile) => {
        profileRef.current = profile;
        _setProfile(profile);
    }

    const [fleets, setFleets] = useState({});
    let token = document.getElementsByName('csrf-token')[0].content;

    function addSpecies(e) {
        e.preventDefault();
        let input = document.getElementById('treein');
        
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
    function addWorktype(e) {
        e.preventDefault();
        let input = document.getElementById('workin');
        
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
                        <div className="grid lg:grid-cols-[1fr_5fr]">
                            <div className="lg:col-start-2 grid grid-cols-4 gap-2">
                                {profile.species && profile.species.map((tree, i)=> (
                                    <ProfileTag key={`${tree}${i}`} tag={tree} removeTag={removeTree}/>
                                ))}
                            </div>
                            <form action="" className="lg:col-start-1">
                                <label htmlFor="treein">Add Species</label>
                                <input type="text" id="treein" className="text-dark"/>
                                <button onClick={addSpecies} className="bg-light text-dark text-sm text-center p-2">Add Tree</button>
                            </form>
                        </div>
                        <div className="grid lg:grid-cols-[1fr_5fr]">
                            <div className="lg:col-start-2 grid grid-cols-4 gap-2">
                                {profile.worktypes && profile.worktypes.map((work, i)=> (
                                    <ProfileTag key={`${work}${i}`} tag={work} removeTag={removeWorktype} />
                                ))}
                            </div>
                            <form action="" className="lg:col-start-1">
                                <label htmlFor="workin">Add Worktype</label>
                                <input type="text" id="workin" className="text-dark"/>
                                <button onClick={addWorktype} className="bg-light text-dark text-sm text-center p-2">Add Tree</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}