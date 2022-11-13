
import {Col, Container, Row} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from "react-router-dom";



function BarraNavegacion() {

  return (
    <>  
      <Navbar bg="primary" variant="dark">
        <Container>
      
            <Col>
              <Navbar.Brand  className="flex" href="#home">Navbar</Navbar.Brand>
            </Col>
            <Col>
              <Nav className="justify-content-center">
                  <div className="vr" />
                  <Nav.Link href="/cancha" style={{margin:'5px'}} >Canchas</Nav.Link>
                  <div className="vr" />
                  <Nav.Link href="/complejo" style={{margin:'5px'}}>Complejos</Nav.Link>
                  <div className="vr" />
                  <Nav.Link href="/deporte" style={{margin:'5px'}}>Deportes</Nav.Link>
                  <div className="vr" />
                  <Nav.Link  style={{margin:'5px'}}>Personas</Nav.Link>
                  <div className="vr" />
                  <Nav.Link style={{margin:'5px'}}>Alquiler</Nav.Link>
                  <div className="vr" />
              </Nav>
            </Col>
            <Col>
              <Nav className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
              </Nav>
            </Col>
       
        </Container>
      </Navbar>
    
      <Outlet />
    </>
  
  );
}

export default BarraNavegacion;