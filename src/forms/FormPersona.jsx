import {useEffect, useState} from 'react';
import { Button, Modal, Form} from 'react-bootstrap';

const FormPersona = (props)=>{
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
      const regexNombre = /^(([a-zA-Z\u00C0-\u00FF]{2,})+( [a-zA-Z\u00C0-\u00FF]+)+)$/gm;   // caracteres y acentos
      const regexApellido = /^(([a-zA-Z\u00C0-\u00FF]{2,})+( [a-zA-Z\u00C0-\u00FF]+)+)$/gm;
      const regexDni= /^[0-9]+$/gm; //Numeros
      const regexTelefono = /^[0-9]+$/gm;

      if(!values.nombre){
        errors.nombre = "Nombre es Requerido"
      }else if (!regexNombre.test(values.nombre)){
        errors.nombre = "Ingrese un nombre correcto"
      }

      if(!values.dni){
        errors.dni = "DNI es requerido"
      }else if (!regexDni.test(values.dni)){
        errors.dni = "Ingrese un dni correcto (solo números)"
      }

      if(!values.apellido){
        errors.apellido = "Apellido es requerido"
      }else if (!regexApellido.test(values.apellido)){
        errors.apellido = "Ingresa un apellido correctamente"
      }

      if(!values.telefono){
        errors.telefono = "Teléfono es requerido"
      }else if (!regexTelefono.test(values.telefono)){
        errors.telefono = "Ingrese un teléfono correctamente (solo números)"
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
          <Modal.Title>{modoAgregar? "Nueva Persona" : "Editar Persona"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value = {`${formValues.nombre}`}
                type= "text"
                name="nombre"
                placeholder="ej: Juan ..."
                autoFocus
                onChange={handleChange}
              />
              <span style={{color: "red"}}>{formErrors.nombre}</span>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                value = {`${formValues.apellido}`}
                type= "text"
                name="apellido"
                placeholder="ej: Gonzalez ..."
                autoFocus
                onChange={handleChange}
              />
              <span style={{color: "red"}}>{formErrors.apellido}</span>
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
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                value = {`${formValues.telefono}`}
                type= "tel"
                name="telefono"
                placeholder="..."
                autoFocus
                onChange={handleChange}
                
              />
              <span style={{color: "red"}}>{formErrors.telefono}</span>
            </Form.Group>
            
            <Button variant="primary" type="submit">Aceptar</Button>
    
          </Form>
        </Modal.Body>
      </Modal>
    )
} 

export default FormPersona;