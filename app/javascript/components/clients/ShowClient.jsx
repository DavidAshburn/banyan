import React, {useState, useEffect} from "react";

export default function ShowClient() {

    const [activeClient, setActiveClient] = useState([]);
    const [properties, setProperties] = useState([]);
    const [treeCount, setTreeCount] = useState([]);

    const clientid = document.getElementById("cid").innerText;

    useEffect(() => {
        fetch(`/data/client?cid=${clientid}`, {
        })  
          .then((response) => response.json())
          .then((data) => {
            console.log(data);  
            setActiveClient(data.client);
            setProperties(data.properties);
            setTreeCount(data.tree_count);
          });
      }, []);

    return(
        <div className="flex flex-col gap-4 md:p-4 text-lg text-white font-inter min-h-screen">
            <p className="col-span-4">
                {activeClient.name}
            </p>
            <p className="col-span-4">
                {treeCount} trees
            </p>
        </div>
    )
}