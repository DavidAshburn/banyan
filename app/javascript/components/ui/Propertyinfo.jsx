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
        <div className="mainpane">
            <p className="panetitle">{property.address}</p>
            <div className="grid gap-2 p-2 text-dark">
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