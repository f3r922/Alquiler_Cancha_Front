import {useEffect, useState} from 'react';
import {Table, Button, Container} from 'react-bootstrap';
import FormDeporte from '../forms/FormDeporte';
import FilaDeporte from '../filas/FilaDeporte';
import  ".."  

const Deportes = ()=>{

    const deporteInicial = {
      descripcion: "",
    };
    
    const[deportes, setDeportes] = useState([]);

    const [show, setShow] = useState(false);

    const [open, setOpen] = useState(false);

    const [modoAgregar, setModoAgregar] = useState(true);
    
    const [deporteElegido, setDeporteElegido] = useState(deporteInicial);
    

 


    useEffect(() => {
        fetch("http://localhost:4000/deportes").then((respuesta) => {
          respuesta.json().then((getDeportes) => {
            console.log(getDeportes);
            //dispatch({payload: getTareas});
            setDeportes([...getDeportes]);
          });
        });
    
      },[open]);
    
      
    const eliminarDeporte = async (deporte)=>{
        console.log(deporte)
        const respuesta = await fetch("http://localhost:4000/deportes/" + deporte.id, {
          method: "DELETE",
        });
        if (respuesta.ok) {
          setOpen(!open);
        } else {
          console.error("error al eliminar tarea");
        }
      }


    const agregarDeporte = async (deporte)=>{
        
        
        const respuesta = await fetch("http://localhost:4000/deportes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descripcion: deporte.descripcion,
          }),
        });
        if (respuesta.ok) {
          const nuevoDeporte= await respuesta.json();
          console.log(nuevoDeporte);
          setOpen(!open);
        } else {
          console.error("Fallo al crear deporte");
        };
        setShow(false);
        setDeporteElegido(deporteInicial);
    }
    

    const editarDeporte = async (deporteEditado) => {
    console.log(deporteEditado)
      const respuesta = await fetch("http://localhost:4000/deportes/" + deporteEditado.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descripcion:deporteEditado.descripcion,
        }),
      });
      if (respuesta.ok) {
        setOpen(!open);
        } else {
        console.error("Fallo al editar deporte");}
      setShow(false);
      setModoAgregar(true);
      setDeporteElegido(deporteInicial);
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
      setDeporteElegido(deporteInicial);
      setModoAgregar(true);
      setShow(false);}
  
    return(
    <> 
      <div className='d-flex justify-content-center mt-5 mb-5'>
        <Button variant="primary" onClick={handleShow}>
          Agregar Deporte
        </Button>
      </div>

      <FormDeporte
        show={show}
        close={handleClose}
        valor={deporteElegido}
        modoAgregar={modoAgregar}
        onAgregar= {agregarDeporte}
        onEditar= {editarDeporte}
      />

        <Container >
          <Table className='deportes-lista-contenedor '  striped bordered hover>
            <thead style={{backgroundColor:'gray'}}>
              <tr>
                <th >#</th>
                <th >Deporte</th>
                <th >Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
              
              deportes.map((deporte, index) => 
                <FilaDeporte
                  deporte= {deporte}
                  key= {deporte.id}
                  index = {index}
                  onEliminar = {eliminarDeporte}
                  onEditar = {(deporte) => {
                    setModoAgregar(false);
                    setShow(true);
                    setDeporteElegido(deporte)
                  }}
                />
              )

              }
            </tbody>
          </Table>
        </Container>
    </> 
  );
      
}

export default Deportes;