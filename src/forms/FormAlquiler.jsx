import { useEffect, useState } from 'react';
import { Button, Modal, Form, Row, Col} from 'react-bootstrap';

const FormAlquiler = (props)=> {
    
    const{show, close, valor, modoAgregar, onAgregar, onEditar} = props;

    const[personas, setPersonas] = useState([]);
    
    const[canchas, setCanchas] = useState([]);

    const[deportes, setDeportes] = useState([]);

   
    const [formValues, setFormValues] = useState(valor);
    const [formErrors, setFormErrors] = useState({});
    const [valorDeporte, setValorDeporte] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const horarios = ["12:00","13:00","14:00","15:00","16:00","17:00",
                    "18:00","19:00","20:00","21:00","22:00","23:00","24:00"]


    useEffect(() => {
        fetch("http://localhost:4000/canchas").then((respuesta) => {
          respuesta.json().then((getCanchas) => {
            setCanchas([...getCanchas]);
            console.log(getCanchas)
          });
        });
    
      },[]);
    
    useEffect(() => {
        fetch("http://localhost:4000/personas").then((respuesta) => {
          respuesta.json().then((getPersonas) => {
            setPersonas([...getPersonas]);
            console.log(getPersonas)
          });
        });
    
    },[]);

    useEffect(() => {
        fetch("http://localhost:4000/deportes").then((respuesta) => {
          respuesta.json().then((getDeportes) => {
            setDeportes([...getDeportes]);
            console.log(getDeportes)
          });
        });
    
    },[]);
    useEffect(() => {
        
        setFormValues(valor);
        setIsSubmit(false);
      }, [valor]);// Solo se vuelve a ejecutar si la propiedad valor inicial

    useEffect(()=>{
        
        if(Object.keys(formErrors).length === 0 && isSubmit) {
          //console.log(formValues);
          agregarOeditar();
        } 
  
      }, [formErrors]);  
      
    const agregarOeditar = (e)=>{
        if(modoAgregar){
            onAgregar(formValues);
            setFormValues(valor);
            setValorDeporte({})
        }else{
            console.log("editar");
            onEditar(formValues);
            setFormValues(valor);
            setValorDeporte({})
        }
    
    }

    const handleSubmit = (e) =>{
        console.log(formValues);
        e.preventDefault();
       
        setFormErrors(validate(formValues))
        setIsSubmit(true);
        console.log(formErrors);
        console.log(isSubmit);
    
        
      };
  
      const validate = (formValues) => {
        console.log(formValues);
        const errors = {};
        if(!formValues.canchaId){
          errors.canchaId = "Cancha es requerida"
        }
        if(!formValues.personaId){
            errors.personaId = "Persona es requerida"
        }
    
        if(!formValues.hora_inicio){
            errors.hora_inicio = "hora inicio es requerida"    
        }
        if(!formValues.hora_fin){
            errors.hora_fin = "hora fin es requerida"    
        }
        if(!formValues.fecha){
            errors.fecha = "fecha es requerida"    
        }
 
        return errors;
      };
      
  

    return (

        <Modal show={show} onHide={() => {
                                    close()
                                    setFormErrors({})
                                    setValorDeporte({})
                                    setIsSubmit(false)
                                    }
                                }
        >
                <Modal.Header closeButton>
                    <Modal.Title>{modoAgregar? "Nuevo Alquiler" : "Editar Alquiler"} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <Form onSubmit={handleSubmit}>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Deporte</Form.Label>
                            <Form.Select  name="deporte" onChange={(e) => {console.log(valorDeporte);setValorDeporte({...valorDeporte, deporteId: e.target.value})}}>
                                <option hidden selected value="">...Elegir</option>
                                {deportes.map((deporte, index)=>
                                   <option key={index} value={deporte.id} >{deporte.descripcion}</option> 
                                )}
                            </Form.Select>
                        </Form.Group>



                    <Row className="mb-3">
                        {/* Formulario para seleccionar cancha */}
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Cancha</Form.Label>
                            <Form.Select  onChange={(e) => setFormValues({...formValues, canchaId: e.target.value})} name="canchaId">
                                {modoAgregar? <option hidden selected value="">...Elegir</option> : 
                                <option hidden selected value={formValues.canchaId}>{formValues.cancha.descripcion}</option> }
                                {canchas.map((cancha, index)=> (
                                    cancha.deporte.id == valorDeporte.deporteId? <option key={index} value={cancha.id} >{cancha.descripcion} {cancha.complejo.denominacion}</option> : ""
                                ))}
                            </Form.Select>
                            <span style={{color: "red"}}>{formErrors.canchaId}</span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword" >
                            <Form.Label>Persona</Form.Label>
                            <Form.Select  onChange={(e) => setFormValues({...formValues, personaId: e.target.value})} name="personaId">
                                {modoAgregar? <option hidden selected value="">...Elegir</option> : <option hidden selected value={formValues.personaId}>{formValues.persona.nombre} {formValues.persona.apellido}</option> }
                                {personas.map((persona, index)=>
                                   <option key={index} value={persona.id} >{persona.nombre} {persona.apellido}</option> 
                                )}
                            </Form.Select>
                            <span style={{color: "red"}}>{formErrors.personaId}</span>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Hora de Inicio</Form.Label>
                            <Form.Select  onChange={(e) => {console.log(e.target.value);setFormValues({...formValues, hora_inicio: e.target.value})}} name="hora_inicio">
                                {modoAgregar? <option hidden selected value="">...Elegir</option> : <option hidden selected value={formValues.hora_inicio}>{formValues.hora_inicio}</option> } 
                                { 
                                    horarios.map((horario, index) => (
                                        <option key={index} value={horario}>{horario}</option>
                                ))
                                }
                            </Form.Select>
                            <span style={{color: "red"}}>{formErrors.hora_inicio}</span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Hora Fin</Form.Label>
                            <Form.Select  onChange={(e) => {console.log(e.target.value);setFormValues({...formValues, hora_fin: e.target.value})}} name="hora_fin">
                                {modoAgregar? <option hidden selected value="">...Elegir</option> : <option hidden selected value={formValues.hora_fin}>{formValues.hora_fin}</option> } 
                                { 
                                    horarios.map((horario, index) => (
                                        <option key={index} value={horario}>{horario}</option>
                                ))
                                }
                            </Form.Select>
                            <span style={{color: "red"}}>{formErrors.hora_fin}</span>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>
                                Estado
                            </Form.Label>
                            <Form.Check
                                name="estado"
                                checked={formValues.estado}
                                onChange={(e) => {console.log(e.target.checked); setFormValues({...formValues, estado: e.target.checked})}}
                                type="switch"
                                label="no/si"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                value = {formValues.fecha}
                                type= "date"
                                name="fecha"
                                autoFocus
                                onChange={(e) => setFormValues({...formValues, fecha: e.target.value})}
                            />
                            <span style={{color: "red"}}>{formErrors.fecha}</span>
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
    
                </Modal.Body>
        </Modal>
    )
}

export default FormAlquiler;