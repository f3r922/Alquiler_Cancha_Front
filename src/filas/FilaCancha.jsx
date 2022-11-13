import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt, faCircleExclamation, faCircleXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


const FilaCancha = (props)=> {
    const {onEditar, onEliminar, cancha, index} = props;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title  >
                        <FontAwesomeIcon icon={faCircleExclamation}  style={{color:"red"}} size='lg'/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Estas seguro que deseas eliminar <strong>{cancha.descripcion}</strong>?</Modal.Body>
                <Modal.Footer style={{alignItems: "center", justifyContent:'center'}}>
                    <Button title='Cancelar' variant="outline-secondary" size='lg' onClick={handleClose}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </Button>
                    <Button title='Aceptar' variant="outline-success" size='lg' onClick={() => {handleClose(); onEliminar(cancha)}}>
                        <FontAwesomeIcon icon={faCircleCheck} />
                    </Button>
                </Modal.Footer>
            </Modal>
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
                    <Button  variant="outline-danger" title="Eliminar" onClick={handleShow}><FontAwesomeIcon icon={faTrash} /></Button>
                </td>
            </tr>   
        </>
    )
}

export default FilaCancha;