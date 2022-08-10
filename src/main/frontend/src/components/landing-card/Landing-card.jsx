import './landing-card.css';
import { useNavigate } from "react-router-dom";

function LandingCard(props){
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit");
        navigate("/list");
    }

    return (
            <div className="landing-card">
                <h2>Enter List Title:</h2>
                <form onSubmit={handleSubmit}>
                    <input className="inputText" type="text" placeholder='Title' value={props.listTitle} onChange={(event) => props.setListTitle(event.target.value)} required/>
                    <button className="button">Create List</button>
                </form>
            </div>
      )
}

export default LandingCard;