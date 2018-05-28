import React, { Component } from 'react';
import graphqlClient from '../../utils/graphqlClient';
import Modal from 'react-modal';
import EditUsuario from './editUsuario';
import './tabla.css';

class Tabla extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuarios: [],
            isVisibleModalEdit: false,
            idUserEdit: null
        }

        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.openModalEdit = this.openModalEdit.bind(this);
        this.closeModalEdit = this.closeModalEdit.bind(this);
    }

    openModalEdit(id) {
        this.setState({ isVisibleModalEdit: true, idUserEdit: id });
    }
    closeModalEdit() {
        this.setState({ isVisibleModalEdit: false });
    }

    onClickDelete(e) {
        if (e.target.id) {
            graphqlClient(`
                mutation{
                    deleteUsuario(id:${e.target.id})
                }
            `).then(res => {
                    if (res.data.deleteUsuario === true) {
                        this.componentDidMount();
                    } else {
                        alert("Error");
                    }
                })
        }
    }

    onClickEdit(e) {
        if (e.target.id) {
            this.openModalEdit(e.target.id);
        }
    }

    render() {
        return (
            <div id="Todos" className="tabcontent">
                <input
                    className="input"
                    type="button"
                    defaultValue="Crear" />
                <div className="containerTabla" >
                    <table
                        id="list-users-admin"
                        className="container">
                        <tbody>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Cedula</th>
                                <th>Rol</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Programa</th>
                                <th>Opciones</th>
                            </tr>
                            {
                                (this.state.usuarios) && this.state.usuarios.map((current, key) => {
                                    return (
                                        <tr key={key} id={current.id}  >
                                            <td>{current.codigo}</td>
                                            <td  width="10%"> {current.nombre} {current.nombre2}</td>
                                            <td  width="10%"> {current.apellido} {current.apellido2}</td>
                                            <td>{current.dni}</td>
                                            <td>{current.rol.nombre}</td>
                                            <td  width="30%"> >{current.email}</td>
                                            <td>{current.telefono}</td>
                                            <td>{current.programa.nombre}</td>
                                            <td>
                                                <button id={current.id} onClick={this.onClickEdit} >Editar</button>
                                                <button id={current.id} onClick={this.onClickDelete} >Eliminar</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <Modal
                    isOpen={this.state.isVisibleModalEdit}
                    onRequestClose={this.closeModalEdit}
                    contentLabel="Editar Usuario"
                >
                    <EditUsuario id={this.state.idUserEdit} />
                </Modal>
            </div>
        );
    }

    componentDidMount() {
        graphqlClient(`
            query{
                usuarios{
                    id
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
                this.setState({ usuarios: dat.data.usuarios })
            })
            .catch(err => {
                alert(err);
            })
    }
}

export default Tabla;