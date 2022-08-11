import LandingCard from "../components/landing-card/Landing-card.jsx";
import "../App.css";

function Landing(props){

    return (
        <LandingCard theme={props.theme} listTitle={props.listTitle} setListTitle={props.setListTitle}/>
      )
}

export default Landing;