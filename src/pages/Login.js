import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import {Button, Container, Form} from 'react-bootstrap'
import imagen from "../imagen/imagen.png"

export default function Login(){

    const {login} = useAuthContext();
    const [magicWord, setMagicWord] = useState('');

    function handleInputChange(e) {
        const {name, value} = e.target;
        setMagicWord({...magicWord,[name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(magicWord.usuario, magicWord.password);
    }

    return( 
        <Container id="main-container" className="d-grid h-100">
            <Form id="sign-in-form" className="text-center p-3 w-100" onSubmit={handleSubmit}>
                <img className="logo" 
                    src={imagen}
                    alt="ingreso" />
                <h1 className="mb-3 fs-3 fw-normal">Bienvenido de Nuevo!</h1>
                <Form.Group controlId="sign-in-email-address">
                    <Form.Control type="text" size="lg" placeholder="Usuario" autoComplete="username" 
                    className="position-relative" onChange={handleInputChange} name="usuario" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="sign-in-password">
                    <Form.Control type="password" size="lg" placeholder="Password" autoComplete="current-password" 
                    className="position-relative" onChange={handleInputChange} name="password"  />
                </Form.Group>

                <Form.Group className="d-flex justify-content-center mb-4" controlId="remember-me">
                    <Form.Check label="Remember me" />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="primary" size="lg" type="submit" >Iniciar sesión</Button>
                </div>
            </Form>
        </Container>       
    );
}