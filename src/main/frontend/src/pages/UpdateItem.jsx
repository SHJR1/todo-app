import {useParams} from 'react-router-dom';
import EditItem from '../components/EditItem'


function UpdateItem() {

    const { id } = useParams();

  return (

    <div className='container' style={{flexDirection: 'column'}}>
      <EditItem itemId={id}/>
    </div>

  )
}

export default UpdateItem;