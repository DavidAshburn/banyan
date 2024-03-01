import React, { useState,useEffect } from "react"
import FleetDetails from "./ui/FleetDetails";

export default function UserFleet() {
    const [vehicles, setVehicles] = useState([]);
    const [equipment, setEquipment] = useState([]);

    useEffect(()=> {
        fetch('data/fleet')
            .then((response) => response.json())
            .then((data) => {
                setVehicles(data.vehicles);
                setEquipment(data.equipment);
            });
    });

    return(
        <div className="grid lg:grid-cols-[1fr_6fr_1fr] min-h-screen bg-dark p-4">
            <div className="lg:col-start-2 min-h-[30vh]">
                <div className="mainpane">
                    <p className="panetitle">User Profile</p>
                    <div className="panecontent grid-rows-4 min-h-[50vh]">
                        <FleetDetails fleettype="Vehicle" items={vehicles} />
                        <FleetDetails fleettype="Equipment" items={equipment} />
                    </div>
                </div>
            </div>
        </div>
    )
}