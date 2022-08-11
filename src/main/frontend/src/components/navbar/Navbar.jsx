import "../navbar/nav.css"
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const deleteAll = async () => {    
          try {
            console.log('DELETE!');
            await fetch(`http://localhost:8888/api/tasks`, {
            method: 'DELETE',
            headers: {
              'SameSite': 'None'
            }
          });
        //   const data = await response.json();
    
          console.log('All items deleted!');
          navigate('/');
    
          } catch (error) {
            console.log(error.message);
          }
          
      }

    return (
        <nav className="nav">
            <a href="/" className="site-title">Todo List</a>
            <ul>
                <li>
                    <button onClick={() => deleteAll()}>New List</button>
                </li>
                {/* <li>
                    <a>Dark/Light Mode</a>
                </li> */}
            </ul>
        </nav>
    )
}

export default Navbar;