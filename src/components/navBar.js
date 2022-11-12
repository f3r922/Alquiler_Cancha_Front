
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Outlet } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';


function BarraNavegacion() {
  const expand = false;
  return (
    <>
        <Navbar key={expand} bg="primary" expand={expand} className="mb-3" variant="dark">
          <Container fluid>
            <Navbar.Brand href="/">Alquiler Canchas</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/cancha">Cancha</Nav.Link>
                  <Nav.Link href="/deporte">Deporte</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    
      <Outlet />
    </>
  
  );
}

export default BarraNavegacion;