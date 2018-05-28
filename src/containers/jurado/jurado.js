import React, {Component} from 'react';
import graphqlClient from '../../utils/graphqlClient';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {logout, setCurrentUser} from '../../redux/actions/login';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import config from '../../config/default.json';
import './jurado.css';


class Jurado extends Component{

    constructor(props){
        super(props);

        this.state = {
            votantes:[],
            codigo: "",
            buscado: {},
            idUserToAuth: null
        }

        this.searchByCodigo = this.searchByCodigo.bind(this);
        this.onChange = this.onChange.bind(this);
        this.autorizarUserPre = this.autorizarUserPre.bind(this);
        this.autorizarUser = this.autorizarUser.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
        if(this.state.buscado.codigo){
            this.setState({buscado: {}});
        }
    }

    searchByCodigo(){
        graphqlClient(`
            query{
                usuario(codigo:"${this.state.codigo}"){
                    id
                    codigo
                    nombre
                    apellido
                    apellido2
                    dni
                    statusUser{
                        id
                        nombre
                    }
                }
            }
        `).then(({data}) => {
            if(data.usuario){
                this.setState({
                    buscado: data.usuario
                });
            }else{
                alert("No se encontro");
                this.setState({buscado: {}})
            }
        })
        .catch( err => {
            alert(err);
        });
    }

    autorizarUser(){
        graphqlClient(`
            mutation{
                autorizarUsuario(id: ${this.state.idUserToAuth})
            }
        `).then( ({data}) => {
            if(data.autorizarUsuario){
                this.setState({codigo: "", buscado:{}, idUserToAuth: null});
                this.componentDidMount();
            }
        } ).catch( err => {
            alert(err);
        });
    }

    autorizarUserPre(e){
        this.setState({idUserToAuth: e.target.id});
    }

    componentWillMount(){
        this.props.setCurrentUser(localStorage.getItem(config.localStorageLogin));
    }

    render(){
        return(
            <div className="grid-container">
                <div className="item1">
                    <div className="grid-container-ban">
                        <div className="pa1">
                            <img id="logoelectoral" src={require("../../img/logo.png")} alt="logo universidad del magdalena" />
                        </div>
                        <div className="pa2">
                            <b>VOTA PARA LA FÓRMULA DE RECTOR </b><br/> PERIODO 2018 - 2022
                        </div>
                        <div className="pa3">
                            <input className="input" type="button" value="Salir" 
                            onClick={
                                () => {
                                    logout();
                                    this.props.setCurrentUser({});
                                    this.props.history.push('/');
                                }
                            }
                            />
                        </div>
                    </div>
                </div>
                <div className="item2">
                    <div id="dom: 'Bfrtip">
                        <strong>Busqueda por codigo</strong>
                        <input
                            type="text" placeholder="Codigo"
                            name="codigo" value={this.state.codigo}
                            onChange={this.onChange}
                            />
                        <button onClick={this.searchByCodigo} >Buscar</button>
                    </div>
                    <br/>
                    <table id="myTable" className="display tabla-jurado ">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Cedula</th>
                                <th>Nombres y apellidos</th>
                                <th>Voto</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.votantes && !this.state.buscado.codigo && this.state.votantes.map( (cur, key) => {
                                    return (
                                        <tr>
                                            <td>{cur.codigo}</td>
                                            <td>{cur.dni}</td>
                                            <td>{`${cur.nombre} ${cur.apellido} ${cur.apellido2}`}</td>
                                            <td>{cur.statusUser.nombre}</td>
                                            {
                                                (cur.statusUser.id === 1) ? (
                                                    <td>
                                                        <button id={cur.id} onClick={this.autorizarUserPre} >Autorizar</button>
                                                    </td>) : (<td></td>)
                                            }
                                            
                                        </tr>
                                    )
                                })
                            }
                            {
                                (this.state.buscado.codigo) ? (
                                    <tr>
                                       <td>{this.state.buscado.codigo}</td>
                                            <td>{this.state.buscado.dni}</td>
                                            <td>{`${this.state.buscado.nombre} ${this.state.buscado.apellido} ${this.state.buscado.apellido2}`}</td>
                                            <td>{this.state.buscado.statusUser.nombre}</td>
                                            {
                                                (this.state.buscado.statusUser.id === 1) ? (
                                                    <td>
                                                        <button id={this.state.buscado.id} onClick={this.autorizarUserPre} >Autorizar</button>
                                                    </td>) : (<td></td>)
                                            } 
                                    </tr>
                                ):null
                            }
                        </tbody>
                    </table>
                </div>
                <div className="item5">
                    <img className="foot" src={require("../../img/foot.png")} alt="universidad del magdalena"/>
                    <img className="foot" src={require("../../img/una-universidad.png")} alt="universidad del magdalena"/>
                </div>
                <SweetAlert
                    show={this.state.idUserToAuth}
                    title="Autorizacion"
                    showCancelButton
                    text="Esta seguro que desea autorizarlo"
                    onConfirm={() => this.autorizarUser()}
                    onCancel={() => {
                        this.setState({ idUserToAuth: null });
                      }}
                      onEscapeKey={() => this.setState({ idUserToAuth: null })}
                      onOutsideClick={() => this.setState({ idUserToAuth: null })}
                />
            </div>
        );
    }

    componentDidMount(){
        setTimeout(
            () => {
                graphqlClient(`
                    query{
                        usuarios(mesaId: ${this.props.mesaId}){
                        id
                        codigo
                        nombre
                        apellido
                        apellido2
                        dni
                        statusUser{
                            id
                            nombre
                        }
                        }
                    }
                `).then( ({data}) => {
                    this.setState({
                        votantes: data.usuarios
                    });
                })
                .catch( err => {
                    alert(err);
                })   
            },
        1000);
    }
}

function mapStateToProps(state){
    
    return {
        mesaId: state.login.user.mesaId
    }
}

export default connect(mapStateToProps, {setCurrentUser})(withRouter(Jurado));