import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt, faCircleExclamation, faCircleXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


const FilaPersona = (props)=> {
    const {onEditar, onEliminar, persona, index} = props;

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
                <Modal.Body>Estas seguro que deseas eliminar <strong>{persona.nombre}</strong>?</Modal.Body>
                <Modal.Footer style={{alignItems: "center", justifyContent:'center'}}>
                    <Button title='Cancelar' variant="outline-secondary" size='lg' onClick={handleClose}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </Button>
                    <Button title='Aceptar' variant="outline-success" size='lg' onClick={() => {handleClose(); onEliminar(persona)}}>
                        <FontAwesomeIcon icon={faCircleCheck} />
                    </Button>
                </Modal.Footer>
            </Modal>
            <tr>
                <td>
                    {index + 1}
                </td>
                <td >
                    <p>{persona.nombre}</p> 
                </td>
                <td>
                    {persona.apellido}
                </td>
                <td>
                    {persona.dni}
                </td>
                <td>
                    {persona.telefono}
                </td>
                
                <td>
                    <Button onClick={() => onEditar(persona)} variant="outline-success" title="Editar"><FontAwesomeIcon icon={faPenAlt} /></Button>
                    {" "}
                    <Button  variant="outline-danger" title="Eliminar" onClick={handleShow}><FontAwesomeIcon icon={faTrash} /></Button>
                </td>
            </tr>   
        </>
    )
}

export default FilaPersona;