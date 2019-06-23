import React, { Component } from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListasCitas from './components/ListasCitas';

class App extends Component {
  state = {
    citas: []
  };
  
  crearNuevaCita = datos => {
    // copiar el state actual
    const citas = [...this.state.citas, datos];


    // console.log(citas);
    // Agregar el nuevo state
    this.setState({
      citas
    })
  }

  // Elimina las citas del State
  eliminarCita = id => {
      // tomar una copia del state
      const citasActuales = [...this.state.citas];

      // Utilizar filter para sacar el elemento @id del arreglo
      const citas = citasActuales.filter(cita => cita.id !== id);

      //Actaulizar el state
      this.setState({
        citas
      })
  }


  // Cuando la aplicacion cargue
  componentDidMount(){
    const citasLS = localStorage.getItem('citas');
    if(citasLS){
      this.setState({
        citas: JSON.parse(citasLS)
      })
    }
  }


  // Cuando eliminimos o agreguemos una nueva cita
  componentDidUpdate(){
    localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }

	render() {
		return (
			<div className="container">
				<Header titulo="Administrador de pacientes Veterinaria" />

				<div className="row">
					<div className="col-md-10 mx-auto">
						<NuevaCita 
              crearNuevaCita={this.crearNuevaCita}
            />
					</div>

          <div className="mt-5 col-md-10 mx-auto">
            <ListasCitas 
              citas={this.state.citas}
              eliminarCita={this.eliminarCita}
            />
          </div>
				</div>
			</div>
		);
	}
}

export default App;
