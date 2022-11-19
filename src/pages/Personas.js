import { useEffect, useState } from "react";
import {Table, Container, Button} from 'react-bootstrap';
import FormPersona from "../forms/FormPersona";
import FilaPersona from "../filas/FilaPersona";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Personas = ()=>{

    const personaInicial = {
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",  
    }

    //en realcion a la busqueda
    const [tablaPersonas, setTablaPersonas]= useState([]);
    const [busqueda, setBusqueda]= useState("");
    //
    
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
            setTablaPersonas([...getPersonas]);
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

  const filtrar=(terminoBusqueda)=>{
    const resultadosBusqueda = tablaPersonas.filter((elemento) => {
      if(elemento.apellido.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
    });
    setPersonas(resultadosBusqueda);
  }

  //eventos al manipular el modal
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setPersonaElegida(personaInicial);
      setModoAgregar(true);
      setShow(false);}
  
  const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
      }
      

return(
  <> 
      <div className='d-flex justify-content-center mt-5 mb-5'>
        <Button variant="primary" onClick={handleShow}>
          Agregar Persona
        </Button>
      </div>

      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Apellido o Nombre"
          onChange={handleChange}
        />
        <button className="btn btn-success">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
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