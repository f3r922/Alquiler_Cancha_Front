import { useState, useEffect } from "react";
import { Button, Container} from 'react-bootstrap';
import FormAlquiler from "../forms/FormAlquiler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TableAlquiler from "../table/TableAlquiler";
import AdvancedExample from "../components/pagination";



const Alquileres = ()=>{
    
    const valorInicial = {
        cancha: {descripcion:"Elegir..."},
        canchaId: "",
        persona: {nombre:"Elegir...", apellido:""},
        personaId:"",
        hora_inicio: "",
        hora_fin: "",
        fecha: "",
        estado: false
    };

    //en realcion a la busqueda
    const [tablaAlquileres, setTablaAlquileres]= useState([]);
    const [busqueda, setBusqueda]= useState("");
    //    
    const [show, setShow] = useState(false);
    
    const [modoAgregar, setModoAgregar] = useState(true);

    const [alquileres, setAlquileres] = useState([])

    const [open, setOpen] = useState(false);

    const [alquilerElegido, setAlquilerElegido] = useState(valorInicial);
    
    const [page, setPage ] = useState(0)
    
    //En relacion a la paginacion 
    const totalAlquileres = alquileres.length
    const [alquileresPerPage, setAlquileresPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)

    const lastIndex = currentPage * alquileresPerPage
    const firstIndex = lastIndex - alquileresPerPage
    
    
    useEffect(() => {
        fetch(`http://localhost:4000/alquileres`)
        .then((respuesta) => {
          respuesta.json()
          .then((getAlquileres) => {
            console.log(getAlquileres);
            setAlquileres([...getAlquileres]);
            setTablaAlquileres([...getAlquileres]);
          });
        });
      },[open]);

    const agregarAlquiler = async (values)=>{

        console.log(values);
        
        const respuesta = await fetch("http://localhost:4000/alquileres", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            canchaId: Number(values.canchaId),
            personaId: Number(values.personaId),
            hora_inicio: values.hora_inicio,
            hora_fin: values.hora_fin,
            fecha: values.fecha,
            estado: values.estado
          }),
        });
        if (respuesta.ok) {
          const nuevoAlquiler= await respuesta.json();
          console.log(nuevoAlquiler);
          setOpen(!open);

        } else {
          console.error("Fallo al crear alquiler");
        };
        setShow(false);
        setAlquilerElegido(valorInicial);
    }

    const eliminarAlquiler = async (alquiler)=>{
      console.log(alquiler);
      const respuesta = await fetch("http://localhost:4000/alquileres/" + alquiler.id, {
        method: "DELETE",
      });
      if (respuesta.ok) {
        console.log('passs');
        setOpen(!open);
      } else {
        console.error("error al eliminar cancha");
      }
    }

    const editarAlquiler = async (values)=>{
      console.log(values);
      const respuesta = await fetch("http://localhost:4000/alquileres/" + values.id,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            canchaId: values.canchaId,
            personaId: values.personaId,
            hora_inicio: values.hora_inicio,
            hora_fin: values.hora_fin,
            fecha: values.fecha,
            estado: values.estado
        }),
      });
        if(respuesta.ok){
          console.log('passs');
          setOpen(!open);
        } else {
            console.error("error al editar alquiler");
        };
      setShow(false);
      setModoAgregar(true);
      setAlquilerElegido(valorInicial);
    }

    const filtrar=(terminoBusqueda)=>{
      const resultadosBusqueda = tablaAlquileres.filter((elemento) => {
        if(elemento.persona.apellido.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.persona.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.hora_inicio.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ){
          return elemento;
        }
      });
      setAlquileres(resultadosBusqueda);
    }

    const handleShow = () => setShow(true);

    const handleClose = () => {
      setAlquilerElegido(valorInicial);
      setModoAgregar(true);
      setShow(false)};
    
    const handleChange= (e) =>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }
    
    return (
      <>
            <div className='d-flex justify-content-center mt-5 mb-5'>
                <Button variant="primary" onClick={handleShow}>
                Agregar Alquiler
                </Button>
            </div>

            <div className="containerInput">
              <input
                className="form-control inputBuscar"
                value={busqueda}
                placeholder="Búsqueda por Apellido, Nombre, Hora de inicio"
                onChange={handleChange}
              />
              <button className="btn btn-success">
                <FontAwesomeIcon icon={faSearch}/>
              </button>
            </div>
            
            <FormAlquiler
            show={show}
            close={handleClose}
            valor={alquilerElegido}
            modoAgregar={modoAgregar}
            onAgregar= {agregarAlquiler}
            onEditar= {editarAlquiler}
            />
              
            <Container style={{minHeight:"100%"}}>
                <TableAlquiler
                alquileres={alquileres}
                eliminarAlquiler={eliminarAlquiler}
                setModoAgregar={setModoAgregar}
                setShow={setShow}
                setAlquilerElegido={setAlquilerElegido}
                lastIndex={lastIndex}
                firstIndex={firstIndex}
                />
                <AdvancedExample
                  alquileres={alquileres}
                  alquileresPerPage={alquileresPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalAlquileres={totalAlquileres}
                />
            </Container >
        </>
    )
}
export default Alquileres;