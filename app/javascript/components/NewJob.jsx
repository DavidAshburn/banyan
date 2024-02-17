import React, {useState, useEffect} from "react"
import flatpickr from 'flatpickr';
import mapboxgl from "mapbox-gl"

export default function NewJob() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [estimator, setEstimator] = useState("");
    const [foreman, setForeman] = useState("");
    const [trees, setTrees] = useState({});
    const [notes, setNotes] = useState("");
    const [crew_size, setCrewSize] = useState(0);
    const [est_hours, setEstHours] = useState(0);
    const [price, setPrice] = useState(0);
    const user_id = document.getElementById('uid').innerText;
    const property_id = document.getElementById('pid').innerText;
    const [profile, setProfile] = useState({});

    useEffect(() => {
        fetch('/data/profile')
            .then((response) => response.json())
            .then((data) => {
                setProfile(data);
            });
        setTrees({'1':'crown reduction','2':'crown thinning'});
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        let token = document.getElementsByName('csrf-token')[0].content;

        const postData = { start, end, estimator, foreman, trees, notes, crew_size, est_hours, price, user_id, property_id };

        const response = await fetch('/jobs.json', {
            method: 'POST',
            headers: {
            'X-CSRF-Token': token,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            console.log('error occurred');
        } else {
            console.log{'response ok'};
        }
    }

    return(
        <div className="grid bg-dark text-light">
            <form onSubmit={handleSubmit} className="grid gap-2 p-4 w-48">
                <label htmlFor="startin">Start Time</label>
                <input className="text-dark rounded-lg h-[2rem]" type="datetime-local" value={start} id="text" onChange={(e) => setStart(e.target.value)}/>
                <label htmlFor="endin">End</label>
                <input className="text-dark rounded-lg h-[2rem]" type="datetime-local" value={end} id="text" onChange={(e) => setEnd(e.target.value)}/>
                <label htmlFor="estimatorin">Estimator</label>
                <input className="text-dark rounded-lg h-[2rem]" type="text" value={estimator} id="estimatorin" onChange={(e) => setEstimator(e.target.value)}/>
                <label htmlFor="foremanin">Foreman</label>
                <input className="text-dark rounded-lg h-[2rem]" type="text" value={foreman} id="foremanin" onChange={(e) => setForeman(e.target.value)}/>
                <label htmlFor="notesin">Notes</label>
                <input className="text-dark rounded-lg h-[2rem]" type="text" value={notes} id="notesin" onChange={(e) => setNotes(e.target.value)}/>
                <label htmlFor="crewin">Crew Size</label>
                <input className="text-dark rounded-lg h-[2rem]" type="number" value={crew_size} id="crewin" onChange={(e) => setCrewSize(e.target.value)}/>
                <label htmlFor="hoursin">Est Hours</label>
                <input className="text-dark rounded-lg h-[2rem]" type="number" value={est_hours} id="hoursin" onChange={(e) => setEstHours(e.target.value)}/>
                <label htmlFor="pricein">Est Price</label>
                <input className="text-dark rounded-lg h-[2rem]" type="number" value={price} id="pricein" onChange={(e) => setPrice(e.target.value)}/>

                <button type="submit">Make Job</button>
            </form>
        </div>
    )
}