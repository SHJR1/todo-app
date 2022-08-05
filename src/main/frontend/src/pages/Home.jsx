import React, { useState, useEffect } from "react";
import Card from "../components/card/Card";

function Tasks() {
    const [tasks, setTasks] = useState([]);
  
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
        <h1 className="welcome">Todo App</h1>
        <div className="container">
            {tasks.length > 0
              ? tasks.map((task) => (
              <Card key={task.id} task={task} />
              ))
              : 'Loading'}
          </div>
        </>
          
      );
}

export default Tasks;