import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../style/taskList.css";

function TaskList(props) {
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
            <h1 className="header">To do:</h1>
            <div>
            {tasks.length > 0
              ? tasks.map((task) => (
              <Card key={task.id} task={task} />
              ))
              : ''}
            </div>
        </>
   )
}

export default TaskList;