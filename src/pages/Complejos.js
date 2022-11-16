import { useEffect, useState } from "react";
import {Table, Container, Button, Modal, Form} from 'react-bootstrap';
import FormComplejo from "../forms/FormComplejo";
import FilaComplejo from "../filas/FilaComplejo";

const Complejos = ()=>{

    const complejoInicial = {
      denominacion: "",
      dni: "",
      domicilio: "",
      encargado: "",
      fechaAlta: "",     
    }


    const [complejos, setComplejos] = useState([]);

    const [show, setShow] = useState(false);

    const [open, setOpen] = useState(false);

    const [modoAgregar, setModoAgregar] = useState(true);
    
    const [complejoElegido, setComplejoElegido] = useState(complejoInicial); 

    useEffect(() => {
        fetch("http://localhost:4000/complejos").then((respuesta) => {
          respuesta.json().then((getComplejos) => {
            console.log(getComplejos);
            //dispatch({payload: getTareas});
            setComplejos([...getComplejos]);
          });
        });
    
    },[open]);

    const agregarComplejo = async (complejo)=>{
        
        
      const respuesta = await fetch("http://localhost:4000/complejos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descripcion: complejo.denominacion,
          dni: complejo.dni,
          domicilio: complejo.domicilio,
          encargado: complejo.encargado,
          fechaAlta: complejo.fechaAlta
        }),
      });
      if (respuesta.ok) {
        const nuevoComplejo= await respuesta.json();
        console.log(nuevoComplejo);
        setOpen(!open);
      } else {
        console.error("Fallo al crear complejo");
      };
      setShow(false);
      setComplejoElegido(complejoInicial);
  }

  const editarComplejo= async (complejoEditado) => { 
    
    console.log(complejoEditado)
      const respuesta = await fetch("http://localhost:4000/complejos/" + complejoEditado.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          denominacion: complejoEditado.denominacion,
          dni: complejoEditado.dni,
          domicilio: complejoEditado.domicilio,
          encargado: complejoEditado.encargado,
          fechaAlta: complejoEditado.fechaAlta
        }),
      });
      if (respuesta.ok) {
        setOpen(!open);
        } else {
        console.error("Fallo al editar complejo");}
      setShow(false);
      setModoAgregar(true);
      setComplejoElegido(complejoInicial);
  }

  const eliminarComplejo= async (complejo) => {
        console.log(complejo)
        const respuesta = await fetch("http://localhost:4000/complejos/" + complejo.id, {
          method: "DELETE",
        });
        if (respuesta.ok) {
          setOpen(!open);
        } else {
          console.error("error al eliminar");
        }

  }

  const handleShow = () => setShow(true);
  const handleClose = () => {
      setComplejoElegido(complejoInicial);
      setModoAgregar(true);
      setShow(false);}


return(
  <> 
      <div className='d-flex justify-content-center mt-5 mb-5'>
        <Button variant="primary" onClick={handleShow}>
          Agregar Complejo
        </Button>
      </div>

      <FormComplejo
        show={show}
        close={handleClose}
        valor={complejoElegido}
        modoAgregar={modoAgregar}
        onAgregar= {agregarComplejo}
        onEditar= {editarComplejo}
      />

      <Container>
        <Table striped bordered hover className='canchas-lista-contenedor'>
          <thead style={{backgroundColor:'gray'}}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Denominación</th>
              <th scope="col">Dirección del Complejo</th>
              <th scope="col">Encargado</th>
              <th scope="col">DNI</th>
              <th scope="col">fecha de alta</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              complejos.map((complejo, index) => 
              <FilaComplejo
                complejo= {complejo}
                key= {complejo.id}
                index = {index}
                onEliminar = {eliminarComplejo}
                onEditar = {(complejo) => {
                  setModoAgregar(false);
                  setShow(true);
                  setComplejoElegido(complejo)
                }}
              />
            )
            }
          </tbody>
        </Table>
      </Container>
  </>
    )
}

export default Complejos;