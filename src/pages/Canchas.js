import { useState, useEffect } from "react";
import { Button, Table, Container} from 'react-bootstrap';
import FormCancha from "../forms/FormCancha";
import FilaCancha from "../filas/FilaCancha";



const Canchas = ()=>{
    
    const valorInicial = {
        complejo: {denominacion:"Elegir..."},
        complejoId: "",
        deporte: {descripcion:"Elegir..."},
        deporteId:"",
        descripcion: "",
        estado:false,
        hora_fin: "",
        hora_inicio: "",
        iluminacion: false,
        precioh: "",
        tipoPisp: "",
        techada: false
    };

    const [show, setShow] = useState(false);
    
    const [modoAgregar, setModoAgregar] = useState(true);

    const [canchas, setCanchas] = useState([])

    const [open, setOpen] = useState(false);

    const [canchaElegida, setCanchaElegida] = useState(valorInicial);
    
    
    
    
    useEffect(() => {
        fetch("http://localhost:4000/canchas").then((respuesta) => {
          respuesta.json().then((getCanchas) => {
  
            setCanchas([...getCanchas]);
            console.log(getCanchas);

          });
        });
      },[open]);

    const agregarCancha = async (values)=>{

        console.log(values);
        
        const respuesta = await fetch("http://localhost:4000/canchas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deporte: Number(values.deporteId),
            complejo: Number(values.complejoId),
            suelo: values.tipoPisp,
            iluminacion: values.iluminacion,
            techada: values.techada,
            precioh: values.precioh,
            descripcion: values.descripcion,
            horaInicio: values.hora_inicio,
            horaFin: values.hora_fin,
            estado: values.estado
          }),
        });
        if (respuesta.ok) {
          const nuevaCancha= await respuesta.json();
          console.log(nuevaCancha);
          setOpen(!open);

        } else {
          console.error("Fallo al crear deporte");
        };
        setShow(false);
        setCanchaElegida(valorInicial);
    }

    const eliminarCancha = async (cancha)=>{
      console.log(cancha);
      const respuesta = await fetch("http://localhost:4000/canchas/" + cancha.id, {
        method: "DELETE",
      });
      if (respuesta.ok) {
        console.log('passs');
        setOpen(!open);
      } else {
        console.error("error al eliminar cancha");
      }
    }

    const editarCancha = async (values)=>{
      //console.log(values);
      const respuesta = await fetch("http://localhost:4000/canchas/" + values.id,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deporte: values.deporteId,
          complejo: values.complejoId,
          suelo: values.tipoPisp,
          iluminacion: values.iluminacion,
          techada: values.techada,
          precioh: values.precioh,
          descripcion: values.descripcion,
          horaInicio: values.hora_inicio,
          horaFin: values.hora_fin,
          estado: values.estado
        }),
      });
        if(respuesta.ok){
          console.log('passs');
          setOpen(!open);
        } else {
            console.error("error al eliminar cancha");
        };
      setShow(false);
      setModoAgregar(true);
      setCanchaElegida(valorInicial);
    }

    const handleShow = () => setShow(true);

    const handleClose = () => {
      setCanchaElegida(valorInicial);
      setModoAgregar(true);
      setShow(false)};
    
    return (
      <>
            <div className='d-flex justify-content-center mt-5 mb-5'>
                <Button variant="primary" onClick={handleShow}>
                Agregar Cancha
                </Button>
            </div>
            
            <FormCancha
            show={show}
            close={handleClose}
            valor={canchaElegida}
            modoAgregar={modoAgregar}
            onAgregar= {agregarCancha}
            onEditar= {editarCancha}
            />

              <Container >
                <Table striped bordered hover className='canchas-lista-contenedor'>
                    <thead>
                    <tr style={{backgroundColor:'gray'}}>
                        <th>#</th>
                        <th>Descripcion</th>
                        <th>Complejo</th>
                        <th>Deporte</th>
                        <th>Estado</th>
                        <th>Hora Inicio</th>
                        <th>Hora Fin</th>
                        <th>Piso</th>
                        <th>Iluminacion</th>
                        <th>Techada</th>
                        <th>Precio hora</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    { canchas.map((cancha, index)=> (
                      <FilaCancha
                        cancha = {cancha}
                        key= {cancha.id}
                        index = {index}
                        onEliminar = {eliminarCancha}
                        onEditar = {(cancha) => {
                          setModoAgregar(false);
                          setShow(true);
                          setCanchaElegida(cancha)
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
export default Canchas;