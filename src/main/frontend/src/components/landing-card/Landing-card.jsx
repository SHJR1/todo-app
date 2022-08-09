import React, { useState } from "react";
import './landing-card.css'

function LandingCard(){
    const [title, setTitle] = useState("");

    return (
            <div className="landing-card">
                <h2>Enter List Title:</h2>
                <form>
                    <h3><span>{title}</span></h3>
                    <input className="inputText" type="text" placeholder='Enter title' value={title} onChange={(event) => setTitle(event.target.value)} required/>
                    <button className="button"><a href='/list'>Create List</a></button>
                </form>
            </div>
      )
}

export default LandingCard;