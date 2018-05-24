import React, {Component} from 'react';
import graphqlClient from '../../utils/graphqlClient';

class Tabla extends Component{

    constructor(props){
        super(props);

        this.state = {
            programas: []
        }
    }

    render(){
        return (
            <div id="Programa" className="tabcontent">
                <input
                    className="input"
                    type="button"
                    defaultValue="Crear" />
                <table
                    id="list-program-admin"
                    className="grid-container">
                    <tbody>
                        <tr>
                            <th>Id Programa</th>
                            <th>Nombre</th>
                            <th>Facultad</th>
                            <th>Id Facultad</th>
                        </tr>
                        {
                            (this.state.programas) && this.state.programas.map( (current, key) =>{return(
                                <tr>
                                    <td>{current.id}</td>
                                    <td>{current.nombre}</td>
                                    <td>{current.facultad.id}</td>
                                    <td>{current.facultad.nombre}</td>
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
                programas{
                    id
                    nombre
                    facultad{
                        id
                        nombre
                    }
                }
            }
        `).then(dat => {
            this.setState({programas: dat.data.programas})
        })
        .catch(err => {
            alert(err);
        })
    }
}

export default Tabla;