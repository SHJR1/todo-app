import {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditItem({itemId}) {

    const navigate = useNavigate();

    const [task, setTask ] = useState('');

    const getTask = async (itemId) => {

        const response = await fetch(`http://localhost:8888/api/tasks/${itemId}`, {
            headers: {
                'SameSite': 'None'
              }
        });
        const data = await response.json();
        const item = data;
    
        setTask(item.task);
    }

    const editTask = async (itemId, updatedTask) => {
        try {
            await fetch(`http://localhost:8888/api/tasks/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'SameSite': 'None'
                },
                body: JSON.stringify(updatedTask)
            });

            navigate(`/list`)

        } catch (error) {
            console.log(error.message);
        }
    
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedTask = {
            task
        }
        editTask(itemId, updatedTask);
    }

    useEffect(() => {
        getTask(itemId);
    }, [itemId]);

  return (
    <div className="container">
        <div className='edit-form'>
            <h2>Edit:</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter item' value={task} onChange={(event) => setTask(event.target.value)} required/>
                <button className='form-button'>Update Product</button>
            </form>

        </div>
    </div>

  )
}

export default EditItem;