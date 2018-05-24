import React, {Component} from 'react';
import graphqlClient from '../../utils/graphqlClient';

class Edit extends Component{
    constructor(props){
        super(props);

        this.state = {
            Codigo: "",
            Nombre: "",
            Nombre2: "",
            Apellido: "",
            Apellido2: "",
            Dni: "",
            Email: "",
            Telefono: "",
            rolSelected: null,
            facultadSelected: null,
            programaSelected: null,
            tipoUsuarioSelected: null,
            statusUserSelected: null,
            mesaSelected: null,
            lugarSelected: null,
            roles:[],
            facultades:[],
            programas: [],
            tiposUsuario: [],
            statusUsers: [],
            mesas: [],
            lugares: []
        }
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    render(){
        return(
            <aside className="sobre" id="confir">
                <form name="admin">
                    <h2>Editar Usuario</h2>
                    <input type="text" id="newcodigo"
                        name="Codigo" placeholder="Codigo"
                        value={this.state.Codigo}
                        />
                    <input
                        type="text" id="newnombre1" name="Nombre" placeholder="Primer Nombre"
                        value={this.state.Nombre}
                        />
                    <br />
                    <input
                        type="text" id="newnombre2" name="Nombre2" placeholder="Segundo Nombre"
                        value={this.state.Nombre2}/>
                    <input
                        type="text" id="newapellido1" name="Apellido1" placeholder="Primer Apellido"
                        value={this.state.Apellido}
                        />
                    <br />
                    <input
                        type="text" id="newapellido2" name="Apellido2" placeholder="Segundo Apellido"
                        value={this.state.Apellido2}
                        />
                    <input
                        type="text" id="newcedula" name="Dni" placeholder="Documento Identificacion"
                        value={this.state.Dni}
                        />
                    <br />
                    <label htmlFor="newrol">Escoge el Rol</label>
                    <select name="rolSelected" id="editRol" value={this.state.rolSelected} onChange={(e) =>{
                        this.setState({rolSelected: parseInt(e.target.value, 10)})
                    }} >
                        {
                            (this.state.roles) && this.state.roles.map( (cur, key) => {
                                return(
                                    <option value={cur.id} >{cur.nombre} </option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="id_programa">Escoge la facultad</label>
                    <select name="facultadSelected" id="editFacultad" value={this.state.facultadSelected} onChange={(e) =>{
                        this.setState({facultadSelected: parseInt(e.target.value, 10)})
                    }} >
                        {
                            (this.state.facultades) && this.state.facultades.map( (cur, key) => {
                                return(
                                    <option value={cur.id} >{cur.nombre} </option>
                                )
                            })
                        }
                    </select>
                    <br/>
                    <label htmlFor="id_programa">Escoge el programa</label>
                    <select name="programaSelected" id="editPrograma" value={this.state.programaSelected} onChange={(e) =>{
                        this.setState({programaSelected: parseInt(e.target.value, 10)})
                    }} >
                        {
                            (this.state.programas) && this.state.programas.map( (cur, key) => {
                                return (cur.facultad.id === this.state.facultadSelected) ?
                                (
                                    <option value={cur.id} >{cur.nombre} </option>
                                ) : null;
                            })
                        }
                    </select>
                    <br/>
                    <label htmlFor="id_programa">Escoge el estado</label>
                    <select name="statusUserSelected" id="editStatusUser" value={this.state.statusUserSelected} onChange={(e) =>{
                        this.setState({statusUserSelected: parseInt(e.target.value, 10)})
                    }} >
                        {
                            (this.state.statusUsers) && this.state.statusUsers.map( (cur, key) => {
                                return(
                                    <option value={cur.id} >{cur.nombre} </option>
                                )
                            })
                        }
                    </select>
                    <br/>
                    <label htmlFor="id_programa">Escoge el tipo de usuario</label>
                    <select name="tipoUsuarioSelected" id="editStatusUser" value={this.state.tipoUsuarioSelected} onChange={(e) =>{
                        this.setState({tipoUsuarioSelected: parseInt(e.target.value, 10)})
                    }} >
                        {
                            (this.state.tiposUsuario) && this.state.tiposUsuario.map( (cur, key) => {
                                return(
                                    <option value={cur.id} >{cur.nombre} </option>
                                )
                            })
                        }
                    </select>
                    <br/>
                    <label htmlFor="id_programa">Escoge la mesa</label>
                    <select name="mes" id="editStatusUser" value={this.state.tipoUsuarioSelected} onChange={(e) =>{
                        this.setState({tipoUsuarioSelected: parseInt(e.target.value, 10)})
                    }} >
                        {
                            (this.state.tiposUsuario) && this.state.tiposUsuario.map( (cur, key) => {
                                return(
                                    <option value={cur.id} >{cur.nombre} </option>
                                )
                            })
                        }
                    </select>
                    <input
                        type="text" id="newemail" name="Email" placeholder="Email"
                        value={this.state.Email}
                        />
                    <br />
                    <input
                        type="text" id="newtelefono" name="Telefono" placeholder="Telefono"
                        value={this.state.Telefono}
                        />
                    {/* FALTAN LOS SELECTS DE LUGAR Y MESA*/}
                    <br />
                    <br />
                    <input
                        className="input"
                        type="submit"
                        defaultValue="Guardar" />
                    <input
                        className="input"
                        type="button"
                        defaultValue="Borrar" />
                </form>
            </aside>
        );
    }

    componentDidMount(){
        graphqlClient(`
            query{
                usuario(id: ${this.props.id}){
                    id
                    codigo
                    nombre
                    nombre2
                    apellido
                    apellido2
                    dni
                    email
                    telefono
                    sexo
                    rol{
                        id
                    }
                    tipoUsuario{
                        id
                    }
                    statusUser{
                        id
                    }
                    programa{
                        id
                    }
                    mesa{
                        id
                    }
                }
                roles{
                    id
                    nombre
                }
                facultades{
                    id
                    nombre
                }
                programas{
                    id
                    nombre
                    facultad {
                        id
                    }
                }
                statusUsers{
                    id
                    nombre
                }
                tipoUsuarios{
                    id
                    nombre
                }
                mesas{
                    id
                    numero
                    lugar{
                        id
                    }
                }
                lugares{
                    id
                    nombre
                }
            }
        `).then(({data}) => {
            this.setState({
                Codigo: data.usuario.codigo,
                Nombre: data.usuario.nombre,
                Nombre2: data.usuario.nombre2,
                Apellido: data.usuario.apellido,
                Apellido2: data.usuario.apellido2,
                Dni: data.usuario.dni,
                Email: data.usuario.email,
                Telefono: data.usuario.telefono,
                Sexo: data.usuario.sexo,
                rolSelected: data.usuario.rol.id,
                programaSelected: data.usuario.programa.id,
                tipoUsuarioSelected: data.usuario.tipoUsuario.id,
                statusUserSelected: data.usuario.statusUser.id,
                roles: data.roles,
                facultades: data.facultades,
                programas: data.programas,
                lugares: data.lugares,
                statusUsers: data.statusUsers,
                tiposUsuario: data.tipoUsuarios
            }, () => {
                this.state.programas.forEach( (elem) => {
                    if(elem.id === this.state.programaSelected){
                        this.setState({facultadSelected: elem.facultad.id});
                    }
                });
                this.state.mesas.forEach( (elem) => {
                    if(elem.id === this.state.mesaSelected){
                        this.setState({lugarSelected: elem.lugar.id});
                    }
                });
            });


            
        })
        .catch( err => {
            alert(err);
        });
    }
}

export default Edit;