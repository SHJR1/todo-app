import "../style/taskList.css";
import { useNavigate } from 'react-router-dom';


function Card({ task, getData }) {
  const navigate = useNavigate();

  let itemId = task.id;

  const deleteItem = async (itemId) => {
    if(window.confirm('Are you sure you want to delete this item?')) {

      try {
        console.log('DELETE!');
        await fetch(`http://localhost:8888/api/tasks/${itemId}`, {
        method: 'DELETE',
        headers: {
          'SameSite': 'None'
        }
      });

      getData();

      } catch (error) {
        console.log(error.message);
      }
      
    }
  }

  function editHandler() {

    navigate(`/item/${itemId}`)
  }

  return (
    <div className="card">
        <h3>{task.task}</h3>
        <div className="buttons">
          <button className="editButton" onClick={() => editHandler()}>Edit</button>
          <button className="deleteButton"  onClick={() => deleteItem(task.id)}>Delete</button>
        </div>
    </div>
  );
}

export default Card;