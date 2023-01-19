import { Link } from "react-router-dom"
import { ALQUILERES, CANCHAS, COMPLEJOS, DEPORTES, HOME, LOGOUT, PERSONAS } from "../config/routes/paths";
import {Button, Col, Container, OverlayTrigger, Popover} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from "@fortawesome/free-solid-svg-icons";


function BarraNavegacion() {

  const name = localStorage.getItem("MY_AUTH_APP");

  return (
    <>  
      <Navbar bg="primary" variant="dark">
        <Container>
      
            <Col>
              <Navbar.Brand  className="flex" href={HOME}>Inicio</Navbar.Brand>
            </Col>
            <Col>
              <Nav className="justify-content-center">
                  <div className="vr" />
                  <Nav.Link href={CANCHAS} style={{margin:'5px'}} >Canchas</Nav.Link>
                  <div className="vr" />
                  <Nav.Link href={COMPLEJOS} style={{margin:'5px'}}>Complejos</Nav.Link>
                  <div className="vr" />
                  <Nav.Link href={DEPORTES} style={{margin:'5px'}}>Deportes</Nav.Link>
                  <div className="vr" />
                  <Nav.Link href={PERSONAS} style={{margin:'5px'}}>Personas</Nav.Link>
                  <div className="vr" />
                  <Nav.Link href={ALQUILERES} style={{margin:'5px'}}>Alquileres</Nav.Link>
                  <div className="vr" />
              </Nav>
            </Col>
            <Col>
              <Nav className="justify-content-end">
                
                <OverlayTrigger
                  trigger="click"
                  key="left"
                  placement="left"
                  overlay={
                    <Popover id={`popover-positioned-left`}>
                      <Popover.Header as="h3">
                        <Link to={LOGOUT} style={{color: 'green'}}>Cerrar Sesión</Link>
                      </Popover.Header>
                    </Popover>
                  }
                >
                  <Button variant="outline-secondary" style={{borderRadius: '30px', color: 'white'}}><FontAwesomeIcon icon={faUserTie} /> {name} </Button>
                </OverlayTrigger>
              </Nav>
            </Col>

        </Container>
      </Navbar>
    
      <Outlet />
    </>
  
  );
}

export default BarraNavegacion;