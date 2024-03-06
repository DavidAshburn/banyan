import React from "react";

export default function JobNextStep({job, handleNextStep}) {

    if(!job.completed) {
        return(
            <button onClick={handleNextStep} className="bg-stone-300 text-dark rounded-lg text-center py-2 px-4">Complete Job</button> 
        )
    } else if(!job.invoiced) {
        return(
            <button onClick={handleNextStep} className="bg-stone-300 text-dark rounded-lg text-center py-2 px-4">Invoice Job</button> 
        )
    } else if(!job.paid){
        return(
            <button onClick={handleNextStep} className="bg-stone-300 text-dark rounded-lg text-center py-2 px-4">Mark Paid</button> 
        )
    } else {
        return <></>
    }
}