import {useParams} from 'react-router-dom';
import EditItem from '../components/EditItem'


function UpdateItem() {

    const { id } = useParams();

  return (

    <div className='container' style={{flexDirection: 'column'}}>
      <h1>Update/Edit Item:</h1>
      <EditItem itemId={id}/>
    </div>

  )
}

export default UpdateItem;