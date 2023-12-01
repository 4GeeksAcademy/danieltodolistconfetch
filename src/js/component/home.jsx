import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState([])

	useEffect(() => {
		//crearUsuario()
		obtenerTareas()
	}, [])

	useEffect(() => {
		actualizarListaDeTareas()
	}, [lista])

	function agregarTarea(e) {
		e.preventDefault()
		setLista([...lista, { "label":tarea, "done":false}])
		setTarea("")
	}
	function eliminar(id) {
		let x = []
		x = lista.filter((item, index) => {
			if (index != id) {
				return item
			}
		})
		setLista(x)
	}

	const crearUsuario = async () => {
		const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/daniel", {
			method: "POST",
			body: JSON.stringify([]),
			headers: { "Content-Type": "application/json" }
		})
		const data = await response.json()
		console.log(data)
	}

	const actualizarListaDeTareas = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/daniel", {
				method: "PUT",
				body: JSON.stringify(lista),
				headers: { "Content-Type": "application/json" }
			})
			const data = await response.json()
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}

	const obtenerTareas = async () => {
		const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/daniel")
		const data = await response.json()
		console.log(data)

		setLista(data)
	}

	return (
		<div className="text-center container">

			<input className="form-control" type="text" value={tarea} onChange={(e) => setTarea(e.target.value)} />

			<button className="btn btn-success" onClick={agregarTarea}>tarea</button>
			<div>
				<ul className="list-group">
					{lista.map((item, id) => (
						<li className="list-group-item" key={id}>
							{item.label}
							<button className="btn btn-danger float-end" onClick={() => eliminar(id)} type="button">
								x
							</button>
						</li>
					))}
				</ul>
			</div>

		</div>
	);
};

export default Home;
