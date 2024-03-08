import React, {useState, useEffect} from "react";
import JobRow from "./dashboard/JobRow";
import Windowpane from "./ui/Windowpane";

export default function JobIndex() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
    
        fetch(`/data/jobs`, {

        })
          .then((response) => response.json())
          .then((data) => {
            setJobs(data);
          });
    
      }, []);
    return(
        <div className="flex flex-col gap-4 md:p-4 text-lg text-dark font-inter min-h-screen">
            <div className="grid gap-2 bg-dark lg:min-h-[40svh]">
                <Windowpane
                    title="Active Jobs"
                    content={jobs.filter((job) => job.job.completed == false)
                                .map((job, j) => (
                    <JobRow jobdata={job} key={j} index={j}/>
                    ))}
                    mainclass="scrollpane max-h-[40svh]"
                />
                <Windowpane
                    title="Completed Jobs"
                    content={jobs.filter((job) => job.job.completed == true && job.job.invoiced == false)
                                .map((job, j) => (
                    <JobRow jobdata={job} key={j} index={j}/>
                    ))}
                    mainclass="scrollpane max-h-[40svh]"
                />
                <Windowpane
                    title="Invoiced Jobs"
                    content={jobs.filter((job) => job.job.invoiced == true && job.job.paid == false)
                                .map((job, j) => (
                    <JobRow jobdata={job} key={j} index={j}/>
                    ))}
                    mainclass="scrollpane max-h-[40svh]"
                />
                <Windowpane
                    title="Paid Jobs"
                    content={jobs.filter((job) => job.job.paid == true)
                                .map((job, j) => (
                    <JobRow jobdata={job} key={j} index={j}/>
                    ))}
                    mainclass="scrollpane max-h-[40svh]"
                />
            </div>
        </div>
    )
}

