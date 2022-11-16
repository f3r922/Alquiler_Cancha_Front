import { useEffect, useState } from "react";
import {Table, Container, Button} from 'react-bootstrap';
import FormPersona from "../forms/FormPersona";
import FilaPersona from "../filas/FilaPersona";

const Personas = ()=>{

    const personaInicial = {
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",  
    }


    const [personas, setPersonas] = useState([]);

    const [show, setShow] = useState(false);

    const [open, setOpen] = useState(false);

    const [modoAgregar, setModoAgregar] = useState(true);
    
    const [personaElegida, setPersonaElegida] = useState(personaInicial); 

    useEffect(() => {
        fetch("http://localhost:4000/personas").then((respuesta) => {
          respuesta.json().then((getPersonas) => {
            console.log(getPersonas);
           
            setPersonas([...getPersonas]);
          });
        });
    
    },[open]);

    const agregarPersona = async (persona)=>{
        
      const respuesta = await fetch("http://localhost:4000/personas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: persona.nombre,
            apellido: persona.apellido,
            dni: persona.dni,
            telefono: persona.telefono
        }),
      });

      if (respuesta.ok) {
        const nuevoPersona= await respuesta.json();
        console.log(nuevoPersona);
        setOpen(!open);
      } else {
        console.error("Fallo al crear persona");
      };
      setShow(false);
      setPersonaElegida(personaInicial);
  }

  const editarPersona = async (personaEditada) => { 
    
    console.log(personaEditada)
      const respuesta = await fetch("http://localhost:4000/personas/" + personaEditada.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: personaEditada.nombre,
          apellido: personaEditada.apellido,
          dni: personaEditada.dni,
          telefono: personaEditada.telefono
        }),
      });
      if (respuesta.ok) {
        setOpen(!open);
        } else {
        console.error("Fallo al editar persona");}
      setShow(false);
      setModoAgregar(true);
      setPersonaElegida(personaInicial);
  }

  const eliminarPersona= async (persona) => {
        console.log(persona)
        const respuesta = await fetch("http://localhost:4000/personas/" + persona.id, {
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
    setPersonaElegida(personaInicial);
      setModoAgregar(true);
      setShow(false);}


return(
  <> 
      <div className='d-flex justify-content-center mt-5 mb-5'>
        <Button variant="primary" onClick={handleShow}>
          Agregar Persona
        </Button>
      </div>

      <FormPersona
        show={show}
        close={handleClose}
        valor={personaElegida}
        modoAgregar={modoAgregar}
        onAgregar= {agregarPersona}
        onEditar= {editarPersona}
      />

      <Container>
        <Table striped bordered hover className='canchas-lista-contenedor'>
          <thead style={{backgroundColor:'gray'}}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">DNI</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              personas.map((persona, index) => 
              <FilaPersona
                persona = {persona}
                key = {persona.id}
                index = {index}
                onEliminar = {eliminarPersona}
                onEditar = {(persona) => {
                  setModoAgregar(false);
                  setShow(true);
                  setPersonaElegida(persona)
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

export default Personas;