import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt, faCircleExclamation, faCircleXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


const FilaAlquiler = (props)=> {
    const {onEditar, onEliminar, alquiler, index} = props;

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
                <Modal.Body>Estas seguro que deseas eliminar el <strong>alquiler</strong>?</Modal.Body>
                <Modal.Footer style={{alignItems: "center", justifyContent:'center'}}>
                    <Button title='Cancelar' variant="outline-secondary" size='lg' onClick={handleClose}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </Button>
                    <Button title='Aceptar' variant="outline-success" size='lg' onClick={() => {handleClose(); onEliminar(alquiler)}}>
                        <FontAwesomeIcon icon={faCircleCheck} />
                    </Button>
                </Modal.Footer>
            </Modal>
            <tr>
                <td>
                    {index + 1}
                </td>
                <td >
                    <p>{alquiler.cancha.descripcion}</p> 
                </td>
                <td>
                    {alquiler.persona.nombre} {alquiler.persona.apellido}
                </td>
                <td>
                    {alquiler.hora_inicio}
                </td>
                <td>
                    {alquiler.hora_fin}
                </td>
                <td>
                    {alquiler.estado? <span className="badge bg-danger">Pagado</span>:<span className="badge bg-success">Reservado</span>}
                </td>
                <td>
                    {alquiler.fecha}
                </td>
                <td>
                    <Button onClick={() => onEditar(alquiler)} variant="outline-success" title="Editar"><FontAwesomeIcon icon={faPenAlt} /></Button>
                    {" "}
                    <Button  variant="outline-danger" title="Eliminar" onClick={handleShow}><FontAwesomeIcon icon={faTrash} /></Button>
                </td>
            </tr>   
        </>
    )
}

export default FilaAlquiler;