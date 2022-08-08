import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function CreateTask() {
    const navigate = useNavigate();

    const [task, setTask] = useState('');

    const createTask = async (newTask) => {
        try {
            const response = await fetch('http://localhost:8888/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'SameSite': 'None'
                },
                body: JSON.stringify(newTask)
            });
      
            const data = await response.json();
      
            console.log('Task Created!', data);
      
            navigate(`/tasks/${data.createdTask.id}`)
            console.log('Task successfully created!');
      
      
        } catch (error) {
            console.log(error.message);
            console.log(`Task did not update - error: ${error.message}`)
        }
      
      }
      
      const handleSubmit = (event) => {
        event.preventDefault();
        
        const newTask = {
            task
        }
        createTask(newTask);
        
        setTask('');
      }
      
    return (
        <>
            <h1>List Title</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Add Task' value={task} onChange={(event) => setTask(event.target.value)} required/>
                <button className='form-button'>Create Task</button>
            </form>
            <h3>{task}</h3>
        </>  
    );
}

export default CreateTask;