import React from "react";
import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';
import "../style/taskList.css";
import CompletedList from '../components/CompletedList';

function Tasks(props) {

	return (
    	<>
			<div className="form">
        		<CreateTask listTitle={props.listTitle} />
			</div>
			<div className="container">
				<div>
        			<TaskList />
				</div>
				<div className="completedList">
        			<CompletedList />
				</div>
			</div>
        </>
    );
}

export default Tasks;