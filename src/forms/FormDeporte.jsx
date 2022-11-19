import {useEffect, useState} from 'react';
import { Button, Modal, Form} from 'react-bootstrap';

const FormDeporte = (props)=>{
    const {show, close, modoAgregar, valor, onAgregar, onEditar } = props;

    const [formValues, setFormValues] = useState(valor);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    

    useEffect(() => {
        console.log(valor);
        setFormValues(valor);
        setIsSubmit(false);
      }, [valor]);// Solo se vuelve a ejecutar si la propiedad valor

    useEffect(()=>{
      //console.log(formErrors);
      if(Object.keys(formErrors).length === 0 && isSubmit) {
        //console.log(formValues);
        agregarOeditar();
        
      } 

    }, [formErrors]);  
    
    const agregarOeditar = ()=>{
        console.log(modoAgregar);
        
          if(modoAgregar) {
            onAgregar(formValues);
            setFormValues(valor);
          } else{
            onEditar(formValues);
            setFormValues(valor);
          };
        
    }

    const handleChange = (e)=> {
       
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
        console.log(formValues);
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log("hola");
      setFormErrors(validate(formValues))
      setIsSubmit(true);
      console.log(formErrors);
      console.log(isSubmit);
      
    };

    const validate = (values) => {
      const errors = {};
      const regex = /^[a-zA-Z]+[a-zA-Z]+$/g;
      if(!values.descripcion){
        errors.descripcion = "Deporte es requerido"
        
      }else if (!regex.test(values.descripcion)){
        errors.descripcion = "Ingrese un deporte correctamente"
      }
      return errors;
    };
    
    return(
      <Modal show={show} onHide={() => {
                                        close()
                                        setFormErrors({})
                                        setIsSubmit(false)
                                        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modoAgregar? "Nuevo Deporte" : "Editar Deporte"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Deporte</Form.Label>
              <Form.Control
                value = {`${formValues.descripcion}`}
                type= "text"
                name="descripcion"
                placeholder="ej:tenis"
                autoFocus
                onChange={handleChange}
              />
              <span style={{color: "red"}}>{formErrors.descripcion}</span>
            </Form.Group>
            
            
            <Button variant="primary" type="submit">Aceptar</Button>
    
          </Form>
        </Modal.Body>
      </Modal>
    )
} 

export default FormDeporte;