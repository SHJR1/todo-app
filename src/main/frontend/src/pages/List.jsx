import {useEffect, useState} from "react";
import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';
import "../style/taskList.css";
// import CompletedList from '../components/CompletedList';

function Tasks(props) {
	const [tasks, setTasks] = useState([]);

	const createTask = async (newTask) => {
        try {
            await fetch('http://localhost:8888/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'SameSite': 'None'
                },
                body: JSON.stringify(newTask)
            });
            // navigate(`/list`)
            console.log('Task successfully created!');
			getData();
      
        } catch (error) {
            console.log(error.message);
            console.log(`Task did not update - error: ${error.message}`)
        }
      
      }
    
    const getData = async () => {
    	const response = await fetch(`http://localhost:8888/api/tasks`);
    	const data = await response.json();
  
    	console.log("Data: ", data);
    	const tasks = data;
		setTasks(tasks);
    	console.log("Tasks: ", tasks);
    };
  
    useEffect(() => {
	   getData();

    }, []);

	return (
    	<>
		<div className="parent-container">
			<div className="form">
        		<CreateTask listTitle={props.listTitle} createTask={createTask}/>
			</div>
			<div className="container">
				<div>
        			<TaskList tasks={tasks} getData={getData}/>
				</div>
				{/* <div className="completedList">
        			<CompletedList />
				</div> */}
			</div>
		</div>
        </>
    );
}

export default Tasks;