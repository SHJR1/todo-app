import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import "./createTask.css";

function CreateTask(props) {

    const [task, setTask] = useState('');
      
      const handleSubmit = (event) => {
        event.preventDefault();
        
        const newTask = {
            task
        }
        props.createTask(newTask);
        
        setTask('');
      }
    
    return (
        <>
            <div className="createTaskContainer">
                <h2>{props.listTitle}</h2>
            
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Add List Item' value={task} onChange={(event) => setTask(event.target.value)} required/>
                    <button className='form-button'>Add</button>
                </form>
            </div>
        </>  
    );
}

export default CreateTask;