import Card from '../card/Card';

const CardList = (props) =>{

    const {task} = props
    console.log(task)
    return(
        <div className = 'card-list'>  
            {task.map((element) => {
                return(
                <Card name = {element.task} />
                )
            })}
        </div>
    )
};




export default CardList