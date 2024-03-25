import React, {useState, useEffect, useRef} from "react"
import AddSpecies from "./userprofile/AddSpecies";
import AddWorktypes from "./userprofile/AddWorktypes";
import AddFleets from "./userprofile/AddFleets";



export default function UserProfile() {
    //listeners need the Ref to have a live reference at xxxRef.current
    const [profile, _setProfile] = useState({});
    const profileRef = useRef(profile);
    const setProfile = (profile) => {
        profileRef.current = profile;
        _setProfile(profile);
    }

    const [fleets, setFleets] = useState([]);

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
                        <AddSpecies items={profile.species} setProfile={setProfile} profileRef={profileRef} />
                        <AddWorktypes items={profile.worktypes} setProfile={setProfile} profileRef={profileRef} />
                        <AddFleets items={fleets} ftype="Vehicle" setFleets={setFleets}/>
                        <AddFleets items={fleets} ftype="Equipment" setFleets={setFleets}/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}