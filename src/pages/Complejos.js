import { useEffect, useState } from "react";
import {Table, Container, Button, Modal, Form} from 'react-bootstrap';

const Complejos = ()=>{
    const [complejos, setComplejos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/complejos").then((respuesta) => {
          respuesta.json().then((getComplejos) => {
            console.log(getComplejos);
            //dispatch({payload: getTareas});
            setComplejos([...getComplejos]);
          });
        });
    
    },[]);

return(
        <Table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Denominación</th>
              <th scope="col">Encargado</th>
              <th scope="col">DNI</th>
              <th scope="col">Domicilio</th>
              <th scope="col">fecha de alta</th>
            </tr>
          </thead>
          <tbody>
            {
            complejos.map((complejo, index) => 
              <tr key={complejo.id}>
                <td>
                  {index + 1}
                </td>
                <td>{complejo.denominacion}</td>
                <td>{complejo.encargado}</td>
                <td>{complejo.dni}</td>
                <td>{complejo.domicilio}</td>
                <td>{complejo.fechaAlta}</td>
              </tr>)
            }
          </tbody>
        </Table>
    )
}

export default Complejos;