import React from "react";

export default function ProfileTag({tag, removeTag}) {

    return(
        <div className="profilecatpair">
            <p>{tag}</p>
            <button onClick={()=>removeTag(tag)} className="profilecatbutton">x</button>
        </div>
    )
}