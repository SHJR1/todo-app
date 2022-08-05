

function Card({ task }) {
  return (
    <div className="card">
      <div className="card-title">
        <h3>{task.task}</h3>
      </div>
    </div>
  );
}

export default Card;