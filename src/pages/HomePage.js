import {Card, Container} from 'react-bootstrap';
import imagenDeportes from '../imagen/deportes.jpg'

export const HomePage = () => {
    return(
      <Container className="tarjeta" style={{ width: '100%' }}>
        <Card bg="ight" border="primary" >
          <Card.Img  src={imagenDeportes} />
          <Card.Body>
            <Card.Title> Soft-canchas</Card.Title>
            <Card.Text>
            Es un sistema que facilita el acceso a toda la oferta canchas deportivas.
            Ofrece a los complejos un software completo de gestión.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    )
  };
  