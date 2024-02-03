import React, {useState} from "react";

export default function JobRow({job}) {
    let [display, setDisplay] = useState('hidden');

  function toggleItem() {
    if (display == 'hidden') {
      setDisplay('grid');
    } else {
      setDisplay('hidden');
    }
  }
    
    return(
        <div
            className="grid items-center grid-cols-2 text-center bg-white min-h-[4rem]"
            data-ref={index}
            onClick={toggleItem}
        >
            <p>Start: {job.start}</p>
            <p>End: {job.end}</p>
            <p>{job.crew_size} Hands</p>
            <p>{job.est_hours} Hours</p>
            <div className={'col-span-full ' + display}> 
                <div className="grid grid-cols-2" key={i}>
                    <p>Estimator: {job.estimator}</p>
                    <p>Foreman: {job.foreman}</p>
                    <p class="col-span-full">Equipment</p>
                    {
                        job.equipment.map((x) => (
                            <p>{x}</p>
                        ))
                    }
                    <p class="col-span-full">Work Order</p>
                    <Trees job_id={job.id} />
                </div>
            </div>
        </div>
    )
}