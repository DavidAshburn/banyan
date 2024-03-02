import React from "react";

export default function InfoPanel({job, vehicles, equipment}) {
    function formatDate(date) {
        if(date === '') return '';
        let fulldate = date.split('T')[0].split('-');
        let fulltime = date.split('T')[1].split('.000');
        let time = fulltime[0].split(':');

        const options = {weekday:'long',year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'numeric'};

        let thisdate = new Date(fulldate[0],fulldate[1],fulldate[2],time[0],time[1]);
        return thisdate.toLocaleDateString('en-US',options);
    }

    return(
        <div className="grid-cols-2 md:grid-cols-4 panecontent">
                    <div className="grid grid-cols-[1fr_4fr] items-center col-span-full md:col-span-2">
                    <p>Start:</p>
                    <p>{formatDate(job.start || '')}</p>
                    </div>
                    <div className="grid grid-cols-[1fr_4fr] items-center col-span-full md:col-span-2">
                    <p>End: </p>
                    <p>{formatDate(job.end || '')}</p>
                    </div>
                    <div className="flex gap-4">
                    <p>Foreman: </p>
                    <p>{ job.foreman }</p>
                    </div>
                    <div className="flex gap-4">
                    <p>Estimator: </p>
                    <p>{ job.estimator }</p>
                    </div>
                    <div className="flex gap-4">
                    <p>Crew Size: </p>
                    <p>{ job.crew_size }</p>
                    </div>
                    <div className="flex gap-4">
                    <p>Est Hours: </p>
                    <p>{ job.est_hours }</p>
                    </div>
                    <div className="flex gap-4">
                    <p>Price: </p>
                    <p>${ job.price }</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p className="col-span-full text-center">Vehicles</p>
                        {vehicles.map((vehicle,i) => 
                            <p key={i}>{vehicle}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p className="col-span-full text-center">Equipment</p>
                        {equipment.map((equip,i) => 
                            <p key={i}>{equip}</p>
                        )}
                    </div>
                    
                </div>
    )
}