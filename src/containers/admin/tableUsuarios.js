import React, { Component } from 'react';
import graphqlClient from '../../utils/graphqlClient';
import Modal from 'react-modal';
import EditUsuario from './modals/editUsuario';
import CrearUsuario from './modals/crearUsuario';
import './tabla.css';
Modal.setAppElement('#root');
class Tabla extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuarios: [],
            editOrCreate: 'new',
            isVisibleModal: false,
            idUserEdit: null
        }

        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(id) {
        this.setState({ isVisibleModal: true, idUserEdit: id });
    }
    closeModal() {
        this.setState({ isVisibleModal: false, editOrCreate:'new' });
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
            this.openModal(e.target.id);
            this.setState({editOrCreate: 'edit'});
        }
    }

    render() {
        
        return (
            <div id="Todos" className="tabcontent">
                <input
                    className="input"
                    type="button"
                    defaultValue="Crear"
                    onClick={ () => {
                        this.openModal();
                    }}
                    />
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
                                            <td>{current.nombre} {current.nombre2}</td>
                                            <td>{current.apellido} {current.apellido2}</td>
                                            <td>{current.dni}</td>
                                            <td>{current.rol.nombre}</td>
                                            <td>{current.email}</td>
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
                    isOpen={this.state.isVisibleModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={true}
                >
                    <CrearUsuario />
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