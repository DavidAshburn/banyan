import React, {useState, useEffect} from "react";
import Windowpane from "./ui/Windowpane";

export default function Profile() {
    let [profile, setProfile] = useState({});

    useEffect(() => {
        fetch(`/data/profile`)
          .then((response) => response.json())
          .then((data) => {
            setProfile(data);
          });
      }, []);

    return(
        <div className="grid lg:grid-cols-[1fr_6fr_1fr] min-h-screen bg-dark p-4 bg-light">
            <div className="lg:col-start-2 min-h-[30vh]">
                <Windowpane
                title="User"
                content={
                    <div className="grid grid-rows-5">
                        <p className="rounded border-b border-stone-50">Name: {profile.name}</p>
                        <p className="rounded border-b border-stone-50">Species Saved: {profile.species}</p>
                        <p className="rounded border-b border-stone-50">Vehicles: {profile.vehicles}</p>
                        <p className="rounded border-b border-stone-50">Equipment: {profile.equipment}</p>
                        <a href="/user/dashboard" className="darkbutton">Dashboard</a>
                    </div>
                }
                light = 'o'
                />
            </div>
        </div>
    )
}