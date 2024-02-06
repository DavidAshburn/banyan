import React, {useState, useEffect} from "react";

export default function PropertyShow() {
    let [property, setProperty] = useState({});
    let [jobs, setJobs] = useState({});
    let [showmapdata, setShowMapData] = useState({});
    let [showmapdatatype, setShowMapDataType] = useState("Property");
    let property_id = document.getElementById('pid').innerText;

    useEffect(() => {
        fetch(`/data/property?pid=${property_id}`)
          .then((response) => response.json())
          .then((data) => {
            setProperty(data);
            setShowMapData(data);
          });
      }, []);

    function getJobs() {
        fetch(`/data/property?pid=${property_id}`)
          .then((response) => response.json())
          .then((data) => {
            setShowMapData(data);
            setJobs(data);
            setShowMapDataType("Jobs")
          });
    }

    function getProperty() {
        setShowMapData(property);
        setShowMapDataType("Property");
    }

    return(
        <div className="grid lg:grid-cols-[1fr_6fr_1fr] min-h-screen bg-dark p-4 bg-light">
            <div className="lg:col-start-2 min-h-[100lvh]">
                <Windowpane
                title="User"
                content={
                    <div className="grid grid-rows-[1fr_2fr]">   
                        <div className="grid grid-rows-8">
                            <p className="rounded border-b border-stone-50">Name: {property.name}</p>
                            <p className="rounded border-b border-stone-50">Contact Name: {property.contact_name}</p>
                            <p className="rounded border-b border-stone-50">Phone: {property.phone}</p>
                            <p className="rounded border-b border-stone-50">Email: {property.email}</p>
                            <p className="rounded border-b border-stone-50">Address: {property.address}</p>
                            <p className="rounded border-b border-stone-50">Type: {property.property_type}</p>
                            <p className="rounded border-b border-stone-50">Tree Access: {property.tree_access}</p>
                            <a href="/user/dashboard" className="darkbutton">Dashboard</a>
                        </div>
                        <div data-controller="propshowmap" id="propshowmap"></div>
                        <div className="hidden" id="showmapdata">{showmapdata}</div>
                        <div className="hidden" id="showmapdatatype">{showmapdatatype}</div>
                    </div>
                }
                light = 'o'
                />
            </div>
        </div>
    )
}