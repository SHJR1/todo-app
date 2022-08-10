import LandingCard from "../components/landing-card/Landing-card.jsx";

function Landing(props){

    return (
        <LandingCard listTitle={props.listTitle} setListTitle={props.setListTitle}/>
      )
}

export default Landing;