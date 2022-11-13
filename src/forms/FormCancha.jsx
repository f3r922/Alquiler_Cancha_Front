import { useEffect, useState } from 'react';
import { Button, Modal, Form, Row, Col} from 'react-bootstrap';

const FormCancha = (props)=> {
    
    const{show, close, valor, modoAgregar, onAgregar, onEditar} = props;

    const[deportes, setDeportes] = useState([]);
    
    const[complejos, setComplejos] = useState([]);

   
    const [formValues, setFormValues] = useState(valor);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    useEffect(() => {
        fetch("http://localhost:4000/deportes").then((respuesta) => {
          respuesta.json().then((getDeportes) => {
            setDeportes([...getDeportes]);
          });
        });
    
      },[]);
    
    useEffect(() => {
        fetch("http://localhost:4000/complejos").then((respuesta) => {
          respuesta.json().then((getComplejos) => {
            setComplejos([...getComplejos]);
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
        }else{
            console.log("editar");
            onEditar(formValues);
            setFormValues(valor);
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
        console.log(formValues.deporteId);
        const errors = {};
        const regex = /^[a-zA-Z]+[a-zA-Z]+$/g;
        if(!formValues.deporteId){
          errors.deporteId = "Deporte es requerido"
        }
        if(!formValues.complejoId){
            errors.complejoId = "Complejo es requerido"
        }
        if(!formValues.tipoPisp){
            errors.tipoPisp = "Tipo de suelo es requerido"    
        }
        if(!formValues.descripcion){
            errors.descripcion = "Nombre es requerido"    
        }else if (!regex.test(formValues.descripcion)){
            errors.descripcion = "Ingrese un Nombre correctamente"
        }
        if(!formValues.hora_inicio){
            errors.hora_inicio = "hora inicio es requerida"    
        }
        if(!formValues.hora_fin){
            errors.hora_fin = "hora fin es requerida"    
        }
        if(!formValues.precioh){
            errors.precioh = "Precio  es requerido"    
        }
        return errors;
      };
      
  

    return (

        <Modal show={show} onHide={() => {
                                    close()
                                    setFormErrors({})
                                    setIsSubmit(false)
                                    }
                                }
        >
                <Modal.Header closeButton>
                    <Modal.Title>{modoAgregar? "Nueva Cancha" : "Editar Cancha"} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Deporte</Form.Label>
                            <Form.Select  onChange={(e) => setFormValues({...formValues, deporteId: e.target.value})} name="deporteId">
                                {modoAgregar? <option hidden selected value="">...Elegir</option> : <option hidden selected value={formValues.deporteId}>{formValues.deporte.descripcion}</option> }
                                {deportes.map((deporte, index)=>
                                   <option key={index} value={deporte.id} >{deporte.descripcion}</option> 
                                )}
                            </Form.Select>
                            <span style={{color: "red"}}>{formErrors.deporteId}</span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword" >
                            <Form.Label>Complejo</Form.Label>
                            <Form.Select  onChange={(e) => setFormValues({...formValues, complejoId: e.target.value})} name="complejoId">
                                {modoAgregar? <option hidden selected value="">...Elegir</option> : <option hidden selected value={formValues.complejoId}>{formValues.complejo.denominacion}</option> }
                                {complejos.map((complejo, index)=>
                                   <option key={index} value={complejo.id} >{complejo.denominacion}</option> 
                                )}
                            </Form.Select>
                            <span style={{color: "red"}}>{formErrors.complejoId}</span>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Tipo de suelo</Form.Label>
                            <Form.Select  onChange={(e) => {console.log(e.target.value);setFormValues({...formValues, tipoPisp: e.target.value})}} name="tipoPisp">
                                {modoAgregar? <option hidden selected value="">...Elegir</option> : <option hidden selected value={formValues.tipoPisp}>{formValues.tipoPisp}</option> } 
                                <option value="cesped">cesped</option>
                                <option value="sintetico">sintético</option>
                                <option value="cemento">cemento</option>
                            </Form.Select>
                            <span style={{color: "red"}}>{formErrors.tipoPisp}</span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                            name="descripcion" 
                            type="text" 
                            placeholder="descripcion" 
                            value={formValues.descripcion} 
                            onChange={(e) => setFormValues({...formValues, descripcion: e.target.value})} />
                            <span style={{color: "red"}}>{formErrors.descripcion}</span>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>
                                Iluminacion
                            </Form.Label>
                            <Form.Check
                                name="iluminacion" 
                                checked={formValues.iluminacion}
                                onChange={(e) => setFormValues({...formValues, iluminacion: e.target.checked})}
                                type="switch"
                                label="no/si"
                            />
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>
                                Techada
                            </Form.Label>
                            <Form.Check
                                name="techada" 
                                checked={formValues.techada}
                                onChange={(e) => setFormValues({...formValues, techada: e.target.checked})}
                                type="switch"
                                label="no/si"
                            />
                            </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>hora inicio</Form.Label>
                            <Form.Control
                                name="hora_inicio" 
                                type="time" 
                                value={formValues.hora_inicio}
                                onChange={(e) => setFormValues({...formValues, hora_inicio: e.target.value})}
                            />
                            <span style={{color: "red"}}>{formErrors.hora_inicio}</span>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>hora fin</Form.Label>
                            <Form.Control
                                name="hora_fin" 
                                type="time" 
                                value={formValues.hora_fin}
                                onChange={(e) => setFormValues({...formValues, hora_fin: e.target.value})}
                            />
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
                                onChange={(e) => setFormValues({...formValues, estado: e.target.checked})}
                                type="switch"
                                label="no/si"
                            />
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>
                                Precio Hora
                            </Form.Label>
                            <Form.Control
                                name="precioh" 
                                type="number"
                                value={formValues.precioh}
                                onChange={(e) => setFormValues({...formValues, precioh: e.target.value})}
                            />
                            <span style={{color: "red"}}>{formErrors.precioh}</span>
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

export default FormCancha;