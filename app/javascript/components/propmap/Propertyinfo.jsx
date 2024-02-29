import React from "react";

export default function Propertyinfo({property, client}) {

    function checkContact(property, client) {
        if(client.name != property.contact_name) {
            return(
                <p>Contact: {property.contact_name}</p>
            )
        }
    }

    return(
        <div className="mainpane bg-stone-800">
            <p className="bg-dark border-b-[6px] border-accent min-h-8 text-white px-2 text-lg leading-7 font-extrabold">{property.address}</p>
            <div className="grid lg:grid-cols-2 gap-2 p-2 text-light">
                <p>Client: {client.name}</p>
                {checkContact(property,client)}
                <p>Phone: {property.phone}</p>
                <p>Email: {property.email}</p>
                <p>Type: {property.property_type}</p>
                <p>Parking: {property.parking}</p>
                <p>Access: {property.tree_access}</p>
            </div>
        </div>
    )
}