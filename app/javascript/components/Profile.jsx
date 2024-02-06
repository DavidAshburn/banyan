import React, {useState} from "react";
import Windowpane from "./Windowpane";

export default function Profile() {

    return(
        <div className="grid min-h-screen bg-dark">
            <Windowpane
            title="User"
            content={
                <div>
                    <p>Profile</p>
                    <a href="/user/dashboard">Dashboard</a>
                </div>
            }
            light = '1'
          />
        </div>
    )
}