import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt } from '@fortawesome/free-solid-svg-icons';


const FilaDeporte = (props)=> {
    const {onEditar, onEliminar, deporte, index} = props;
    return(

    <tr>
        <td>
            {index + 1}
        </td>
        <td >
            <p>{deporte.descripcion}</p> 
        </td>
        <td>
            <Button onClick={() => onEditar(deporte)} variant="outline-success" title="Editar"><FontAwesomeIcon icon={faPenAlt} /></Button>
            {" "}
            <Button onClick={() => onEliminar(deporte)} variant="outline-danger" title="Eliminar"><FontAwesomeIcon icon={faTrash} /></Button>
        </td>
    </tr>   

    )
}

export default FilaDeporte;
