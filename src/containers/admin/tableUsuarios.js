import React, {Component} from 'react';
import graphqlClient from '../../utils/graphqlClient';

class Tabla extends Component{

    constructor(props){
        super(props);

        this.state = {
            usuarios: []
        }
    }

    render(){
        return (
            <div id="Todos" className="tabcontent">
                <input
                    className="input"
                    type="button"
                    defaultValue="Crear"/>
                <table
                    id="list-users-admin"
                    className="grid-container">
                    <tbody>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre 1</th>
                            <th>Nombre 2</th>
                            <th>Apellido 1</th>
                            <th>Apellido 2</th>
                            <th>Cedula</th>
                            <th>Rol</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Programa</th>
                        </tr>
                        {
                            (this.state.usuarios) && this.state.usuarios.map( (current, key) =>{return(
                                <tr>
                                    <td>{current.codigo}</td>
                                    <td>{current.nombre}</td>
                                    <td>{current.nombre2}</td>
                                    <td>{current.apellido}</td>
                                    <td>{current.apellido2}</td>
                                    <td>{current.dni}</td>
                                    <td>{current.rol.nombre}</td>
                                    <td>{current.email}</td>
                                    <td>{current.telefono}</td>
                                    <td>{current.programa.nombre}</td>
                                </tr>
                            )})
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount(){
        graphqlClient(`
            query{
                usuarios{
                    codigo
                    nombre
                    nombre2
                    apellido
                    apellido2
                    dni
                    email
                    telefono
                    programa{
                        nombre
                    }
                    rol{
                        nombre
                    }
                }
            }
        `).then(dat => {
            this.setState({usuarios: dat.data.usuarios})
        })
        .catch(err => {
            alert(err);
        })
    }
}

export default Tabla;