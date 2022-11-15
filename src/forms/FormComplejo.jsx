import {useEffect, useState} from 'react';
import { Button, Modal, Form} from 'react-bootstrap';

const FormComplejo = (props)=>{
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
      const regexDni= /^[0-9]+$/gm; //Numeros
      const regexDenominacion = /(?:(\w+-?\w+)) (?:(\w+))(?: (\w+))?$/g;
      const regexDomiciio = /(?:(\w+-?\w+)) (?:(\w+))(?: (\w+))?$/g; 
      const regexEncargado = /^(([a-zA-Z\u00C0-\u00FF]{2,})+( [a-zA-Z\u00C0-\u00FF]+)+)$/gm;   // caracteres y acentos
      if(!values.denominacion){
        errors.denominacion = "Complejo es Requerido"
        
      }else if (!regexDenominacion.test(values.denominacion)){
        errors.denominacion = "Ingrese un nombre correcto"
      }

      if(!values.dni){
        errors.dni = "DNI es requerido"
        
      }else if (!regexDni.test(values.dni)){
        errors.dni = "Ingrese un dni correcto"
      }

      if(!values.domicilio){
        errors.domicilio = "Dirección es requerida"
        
      }else if (!regexDomiciio.test(values.domicilio)){
        errors.domicilio = "Ingresa una dirección correctamente"
      }

      if(!values.encargado){
        errors.encargado = "Encargado es requerido"
        
      }else if (!regexEncargado.test(values.encargado)){
        errors.encargado = "ingrese datos correctamente"
      }

      if(!values.fechaAlta){
        errors.fechaAlta = "Fecha de Alta es requerida"
        
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
          <Modal.Title>{modoAgregar? "Nuevo Complejo" : "Editar Complejo"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Denominación</Form.Label>
              <Form.Control
                value = {`${formValues.denominacion}`}
                type= "text"
                name="denominacion"
                placeholder="complejo ..."
                autoFocus
                onChange={handleChange}
              />
              <span style={{color: "red"}}>{formErrors.denominacion}</span>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección del Complejo</Form.Label>
              <Form.Control
                value = {`${formValues.domicilio}`}
                type= "text"
                name="domicilio"
                placeholder="ej: av. peron s/n"
                autoFocus
                onChange={handleChange}
              />
              <span style={{color: "red"}}>{formErrors.domicilio}</span>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Encargado</Form.Label>
              <Form.Control
                value = {`${formValues.encargado}`}
                type= "text"
                name="encargado"
                placeholder="ej. pedrito"
                autoFocus
                onChange={handleChange}
              />
              <span style={{color: "red"}}>{formErrors.encargado}</span>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                value = {`${formValues.dni}`}
                type= "text"
                name="dni"
                placeholder="xx xxx xxx"
                autoFocus
                onChange={handleChange}
              />
              <span style={{color: "red"}}>{formErrors.dni}</span>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de Alta</Form.Label>
              <Form.Control
                value = {`${formValues.fechaAlta}`}
                type= "date"
                name="fechaAlta"
                autoFocus
                onChange={handleChange}
                
              />
              <span style={{color: "red"}}>{formErrors.fechaAlta}</span>
            </Form.Group>
            
            <Button variant="primary" type="submit">Aceptar</Button>
    
          </Form>
        </Modal.Body>
      </Modal>
    )
} 

export default FormComplejo;