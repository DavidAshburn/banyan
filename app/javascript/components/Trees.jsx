import React from "react";

export default function Trees({job_id}) {
    if(data.length == 0 ) return (<></>);

    let [job, setJob] = useState([]);

    useEffect(() => {
        fetch(`/data/jobtrees?job_id=${job_id}`)
          .then((response) => response.json())
          .then((data) => {
            setJob(data);
            console.log(data);
          });
      }, []);

    return(
        <div className="grid">
            <p>Stuff</p>
        </div>
    )
}