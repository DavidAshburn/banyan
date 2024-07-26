import React, {useState, useEffect} from "react";
import ClientRow from "../dashboard/ClientRow";
import Windowpane from "../ui/Windowpane";

export default function JobIndex() {
    const [allClients, setAllClients] = useState([]);
    const [activeClients, setActiveClients] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    function searchClients(event) {
        const input = event.target.value;
        fetch('data/searchclients?search=' + input)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data);
            });
    }

    useEffect(() => {
        fetch(`/data/clients`, {
        })
          .then((response) => response.json())
          .then((data) => {
            setAllClients(data.allclients);
            setActiveClients(data.activeclients);
          });
      }, []);

    return(
        <div className="flex flex-col gap-4 md:p-4 text-lg text-dark font-inter min-h-screen">
            <div className="flex flex-col gap-2 lg:min-h-[60svh]">
                <div className="grid p-2 gap-2">
                    <label htmlFor="search" className="text-light">Search</label>
                    <input type="text" name="search" id="search" className="max-w-48 h-8" onChange={searchClients} />
                    { searchResults.length > 0 ? <Windowpane
                            title="Results"
                            content={searchResults.map((client, i) => (
                                <ClientRow
                                client={client[0]}
                                properties={client[1]}
                                index={i}
                                key={i}
                                />
                            ))}
                            mainclass="scrollpane max-h-[30svh]"
                        /> : <></>
                        }
                </div>
                <Windowpane
                    title="Active Clients"
                    content={activeClients.map((client, i) => (
                        <ClientRow
                        client={client[0]}
                        properties={client[1]}
                        index={i}
                        key={i}
                        />
                    ))}
                    mainclass="scrollpane max-h-[80svh]"
                />
                <Windowpane
                    title="All Clients"
                    content={allClients.map((client, i) => (
                        <ClientRow
                        client={client[0]}
                        properties={client[1]}
                        index={i}
                        key={i}
                        />
                    ))}
                    mainclass="scrollpane max-h-[80svh]"
                />
                
            </div>
        </div>
    )
}

