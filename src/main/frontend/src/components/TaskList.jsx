import Card from "./Card";
import "../style/taskList.css";

function TaskList(props) {

   return (
        <>
            <div>
            {props.tasks.length > 0
              ? props.tasks.map((task) => (
              <Card key={task.id} task={task} />
              ))
              : ''}
            </div>
        </>
   )
}

export default TaskList;