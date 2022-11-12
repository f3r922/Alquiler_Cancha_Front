import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt } from '@fortawesome/free-solid-svg-icons';


const FilaCancha = (props)=> {
    const {onEditar, onEliminar, cancha, index} = props;
    return(
    <tr>
        <td>
            {index + 1}
        </td>
        <td >
            <p>{cancha.descripcion}</p> 
        </td>
        <td>
            {cancha.complejo.denominacion}
        </td>
        <td>
            {cancha.deporte.descripcion}
        </td>
        <td>
            {cancha.estado? "Activa":"Inactiva"}
        </td>
        <td>
            {cancha.hora_inicio}
        </td>
        <td>
            {cancha.hora_fin}
        </td>
        <td>
            {cancha.tipoPisp}
        </td>
        <td>
            {cancha.iluminacion? "SI":"NO"}
        </td>
        <td>
            {cancha.techada? "SI":"NO"}
        </td>
        <td>
            {"$"}{cancha.precioh}
        </td>
        <td>
            <Button onClick={() => onEditar(cancha)} variant="outline-success" title="Editar"><FontAwesomeIcon icon={faPenAlt} /></Button>
            {" "}
            <Button onClick={() => onEliminar(cancha)} variant="outline-danger" title="Eliminar"><FontAwesomeIcon icon={faTrash} /></Button>
        </td>
    </tr>   

    )
}

export default FilaCancha;