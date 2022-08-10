import React from "react";
import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';
import { useState } from "react";

function Tasks(props) {
	const [newListItem, setNewListItem] = useState("");

	return (
    	<>
        	<CreateTask listTitle={props.listTitle}/>
        	<TaskList newListItem={newListItem} setNewListItem={setNewListItem}/>
        </>
    );
}

export default Tasks;