import React, {useState, useEffect} from "react";
import Windowpane from "./Windowpane";

export default function PropertyShow() {
    let [property, setProperty] = useState({});
    
    let regex = /=>/g;
    let property_data = document.getElementById('propertydata').innerText.replace(regex,':');
    
    let jsondata = JSON.parse(property_data);

    useEffect(() => {
        setProperty(jsondata);
      }, []);

    return(
        <div className="grid lg:grid-cols-[1fr_6fr_1fr] min-h-screen bg-dark p-4 bg-light">
            <div className="lg:col-start-2 min-h-[100lvh]">
                <Windowpane
                title={property.address}
                content={
                    <div className="grid grid-rows-[1fr_50lvh] gap-4">   
                        <div className="grid grid-cols-2 gap-2">
                            <p className="rounded border-b border-stone-50">{property.name}</p>
                            <p className="rounded border-b border-stone-50">{property.contact_name}</p>
                            <p className="rounded border-b border-stone-50">{property.phone}</p>
                            <p className="rounded border-b border-stone-50">{property.email}</p>
                            <p className="rounded border-b border-stone-50">Type: {property.property_type}</p>
                            <p className="rounded border-b border-stone-50">Tree Access: {property.tree_access}</p>
                            <a href="/user/dashboard" className="darkbutton">Dashboard</a>
                        </div>
                        <div data-controller="propshowmap" id="propshowmap"></div>
                    </div>
                }
                light = 'o'
                />
            </div>
        </div>
    )
}