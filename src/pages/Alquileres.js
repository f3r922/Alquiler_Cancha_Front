import { useState, useEffect } from "react";
import { Button, Table, Container} from 'react-bootstrap';
import FormAlquiler from "../forms/FormAlquiler";
import FilaAlquiler from "../filas/FilaAlquiler";



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

    const [show, setShow] = useState(false);
    
    const [modoAgregar, setModoAgregar] = useState(true);

    const [alquileres, setAlquileres] = useState([])

    const [open, setOpen] = useState(false);

    const [alquilerElegido, setAlquilerElegido] = useState(valorInicial);
    
    
    
    
    useEffect(() => {
        fetch("http://localhost:4000/alquileres").then((respuesta) => {
          respuesta.json().then((getAlquileres) => {
  
            setAlquileres([...getAlquileres]);
            console.log(getAlquileres);

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

    const handleShow = () => setShow(true);

    const handleClose = () => {
      setAlquilerElegido(valorInicial);
      setModoAgregar(true);
      setShow(false)};
    
    return (
      <>
            <div className='d-flex justify-content-center mt-5 mb-5'>
                <Button variant="primary" onClick={handleShow}>
                Agregar Alquiler
                </Button>
            </div>
            
            <FormAlquiler
            show={show}
            close={handleClose}
            valor={alquilerElegido}
            modoAgregar={modoAgregar}
            onAgregar= {agregarAlquiler}
            onEditar= {editarAlquiler}
            />

              <Container >
                <Table striped bordered hover className='canchas-lista-contenedor'>
                    <thead>
                    <tr style={{backgroundColor:'gray'}}>
                        <th>#</th>
                        <th>Cancha</th>
                        <th>Persona</th>
                        <th>Hora Inicio</th>
                        <th>Hora Fin</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    { alquileres.map((alquiler, index)=> (
                      <FilaAlquiler
                        alquiler = {alquiler}
                        key= {alquiler.id}
                        index = {index}
                        onEliminar = {eliminarAlquiler}
                        onEditar = {(alquiler) => {
                          setModoAgregar(false);
                          setShow(true);
                          setAlquilerElegido(alquiler)
                        }}
                      />
                      ))
                    }
                    </tbody>
                </Table>
              </Container >
        </>
    )
}
export default Alquileres;