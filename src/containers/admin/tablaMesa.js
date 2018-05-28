import React, { Component } from 'react';
import graphqlClient from '../../utils/graphqlClient';
import './tabla.css';

class Tabla extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mesas: []
        }
    }

    render() {
        return (
            <div id="Mesa" className="tabcontent">
                <input
                    className="input"
                    type="button"
                    defaultValue="Crear" />
                <div className="containerTabla" >
                    <table
                        id="list-program-admin"
                        className="container">
                        <tbody>
                            <tr>
                                <th>Id Mesa</th>
                                <th>Numero</th>
                                <th>Id Lugar</th>
                                <th>Lugar</th>
                            </tr>
                            {
                                (this.state.mesas) && this.state.mesas.map((current, key) => {
                                    return (
                                        <tr key={key} >
                                            <td>{current.id}</td>
                                            <td>{current.numero}</td>
                                            <td>{current.lugar.id}</td>
                                            <td>{current.lugar.nombre}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    componentDidMount() {
        graphqlClient(`
            query{
                mesas{
                    id
                    numero
                    lugar{
                        id
                        nombre
                    }
                }
            }
        `).then(dat => {
                this.setState({ mesas: dat.data.mesas })
            })
            .catch(err => {
                alert(err);
            })
    }
}

export default Tabla;