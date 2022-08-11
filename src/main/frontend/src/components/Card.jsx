import "../style/taskList.css";

function Card({ task }) {
  return (
    <div className="card">
        <h3>{task.task}</h3>
        <div className="buttons">
          <h3 className="buttonOne">Edit</h3>
          <h3 className="buttonTwo">Delete</h3>
        </div>
    </div>
  );
}

export default Card;