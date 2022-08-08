import React from "react";
import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';

function Tasks() {

	return (
    	<>
        	<CreateTask/>
        	<TaskList/>
        </>
    );
}

export default Tasks;