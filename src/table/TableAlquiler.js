import React, { useState } from "react";
import { Table } from 'react-bootstrap';
import FilaAlquiler from "../filas/FilaAlquiler";



export default function TableAlquiler(props){

	const { alquileres, eliminarAlquiler, setModoAgregar, setShow, setAlquilerElegido, lastIndex, firstIndex } = props

	console.log(alquileres)
	
	return(
		<Table striped bordered hover className='canchas-lista-contenedor table-size'>
			<thead>
				<tr style={{backgroundColor:'gray'}}>
						<th>#</th>
						<th>Cancha</th>
						<th>Persona</th>
						<th>Hora Inicio</th>
						<th>Hora Fin</th>
						<th>Estado</th>
						<th>Fecha</th>
						<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{ 
					alquileres.map((alquiler, index)=> (
					<FilaAlquiler
						alquiler = {alquiler}
						key= {alquiler.id}
						index = {index}
						onEliminar = {eliminarAlquiler}
						onEditar = {(alquiler) => {
							setModoAgregar(false);
							setShow(true);
							setAlquilerElegido(alquiler)
						}}
					/>
					)).slice(firstIndex, lastIndex)
				}
			</tbody>
		</Table>
	)
}