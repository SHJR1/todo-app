import React, { useState } from "react";

function Landing(){
    const [title, setTitle] = useState("");

    return (
        <div>
            <div>
                <h2>Enter List Title:</h2>
                <form>
                    <h3><span>{title}</span></h3>
                    <input type="text" placeholder='Enter title' value={title} onChange={(event) => setTitle(event.target.value)} required/>
                    <button className='form-button'>Create List</button>
                </form>
    
            </div>
        </div>
      )
}

export default Landing;