import React, {Component} from 'react';
import graphqlClient from '../../../utils/graphqlClient';

class Edit extends Component{
    constructor(props){
        super(props);

        this.state = {
            Codigo: "",
            Nombre: "",
            Nombre2: "",
            Apellido1: "",
            Apellido2: "",
            Dni: "",
            Email: "",
            Telefono: "",
            rolSelected: 1,
            facultadSelected: 1,
            programaSelected: 1,
            tipoUsuarioSelected: 1,
            statusUserSelected: 1,
            mesaSelected: 1,
            lugarSelected: 1,
            roles:[],
            facultades:[],
            programas: [],
            tiposUsuario: [],
            statusUsers: [],
            mesas: [],
            lugares: []
        }
        this.onChange= this.onChange.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    

    render(){
        return(
            <aside className="sobre" id="confir">
                <form name="admin">
                    <h2>Editar Usuario</h2>
                    <input onChange={this.onChange} type="text" id="newcodigo"
                        name="Codigo" placeholder="Codigo"
                        value={this.state.Codigo}
                        />
                    <input onChange={this.onChange}
                        type="text" id="newnombre1" name="Nombre" placeholder="Primer Nombre"
                        value={this.state.Nombre}
                        />
                    <br />
                    <input onChange={this.onChange}
                        type="text" id="newnombre2" name="Nombre2" placeholder="Segundo Nombre"
                        value={this.state.Nombre2}/>
                    <input onChange={this.onChange}
                        type="text" id="newapellido1" name="Apellido1" placeholder="Primer Apellido"
                        value={this.state.Apellido}
                        />
                    <br />
                    <input onChange={this.onChange}
                        type="text" id="newapellido2" name="Apellido2" placeholder="Segundo Apellido"
                        value={this.state.Apellido2}
                        />
                    <input onChange={this.onChange}
                        type="text" id="newcedula" name="Dni" placeholder="Documento Identificacion"
                        value={this.state.Dni}
                        />

                    <br/>
                    <br/>
                    <input
                        type="text" id="newemail" name="Email" placeholder="Email"
                        value={this.state.Email} onChange={this.onChange}
                        />
                    <br />
                    
                    <input
                        type="text" id="newtelefono" name="Telefono" placeholder="Telefono"
                        value={this.state.Telefono} onChange={this.onChange}
                        />

                        <br/>
                        <br/>
                    <label htmlFor="newrol">Escoge el Rol</label><br/>
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
                    <br/>
                    <br/>
                    <label htmlFor="id_programa">Escoge la facultad</label><br/>
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
                    <br/>
                    
                    <label htmlFor="id_programa">Escoge La Programa</label><br/>
                    <select name="mes" id="editStatusUser" value={this.state.programaSelected} onChange={(e) =>{
                        this.setState({programaSelected: parseInt(e.target.value, 10)})
                    }} >
                        {
                            (this.state.programas) && this.state.programas.filter( (cur, key) => {
                                return (cur.facultad.id == this.state.facultadSelected );
                            }).map( (cur, key) => {
                                return (<option value={cur.id} >{cur.nombre} </option>);
                            })
                        }
                    </select>
                    <br/>
                    <br/>
                    <label htmlFor="id_programa">Escoge el estado</label><br/>
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
                    <br/>
                    <label htmlFor="id_programa">Escoge el tipo de usuario</label><br/>
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
                    <br/>
                    <label htmlFor="id_programa">Escoge el lugar</label><br/>
                    <select name="mes" id="editStatusUser" value={this.state.lugarSelected} onChange={(e) =>{
                        this.setState({lugarSelected: parseInt(e.target.value, 10)})
                    }} >
                        {
                            (this.state.lugares) && this.state.lugares.map( (cur, key) => {
                                return(
                                    <option value={cur.id} >{cur.nombre} </option>
                                )
                            })
                        }
                    </select>
                    <br/>
                    <br/>
                    <label htmlFor="id_programa">Escoge La mesa</label><br/>
                    <select name="mes" id="editStatusUser" value={this.state.mesaSelected} onChange={(e) =>{
                        this.setState({mesaSelected: parseInt(e.target.value, 10)})
                    }} >
                        {
                            (this.state.mesas) && this.state.mesas.filter( (cur, key) => {
                                return (cur.lugar.id == this.state.lugarSelected );
                            }).map( (cur, key) => {
                                return (<option value={cur.id} >{cur.numero}</option>);
                            })
                        }
                    </select>
                    
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
                roles: data.roles,
                mesas: data.mesas,
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