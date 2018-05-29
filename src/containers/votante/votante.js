import React from 'react';
import LogoUnimag from '../../img/logo.png';
import graphqlClient from '../../utils/graphqlClient';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout, setCurrentUser } from '../../redux/actions/login';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import config from '../../config/default.json';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import './tabs.css';
import './candidatos.css';

class Votante extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            candidatos1 : [],
            candidatos2 : [],
            candidatos3 : [],
            organo1: '',
            organo2: '',
            organo3: '',
            alert: false,
            msgAlert: "",
            keyTab: 0,
            votado: false
        }
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.votar = this.votar.bind(this);
        this.handleSelectTab = this.handleSelectTab.bind(this);
    }

    votar(){
        if(this.state.organo1 === '' || this.state.organo2 === '' || this.state.organo3 === ''){
            this.setState({error: true})
        }else{
            graphqlClient(`
                mutation{
                    organo1: newVoto(votoNew:{
                        candidatoId: ${this.state.organo1}
                        mesaId: ${this.props.user.mesaId}
                    }){
                        id
                    }
                    organo2: newVoto(votoNew:{
                        candidatoId: ${this.state.organo2}
                        mesaId: ${this.props.user.mesaId}
                    }){
                        id
                    }
                    organo3: newVoto(votoNew:{
                        candidatoId: ${this.state.organo3}
                        mesaId: ${this.props.user.mesaId}
                    }){
                        id
                    }
                }
            `)
            .then( ({data}) => {
                if(data.error){
                    alert(data.error.msg);
                }else{
                    this.setState({
                        alert: true,
                        msgAlert: "Voto registrado",
                        votado: true
                    });

                }
            })
            .catch( err => {
                alert(err);
            });
        }
    }

    componentWillMount(){
        this.props.setCurrentUser(localStorage.getItem(config.localStorageLogin));
    }

    handleOptionChange(changeEvent) {
        this.setState({
          [changeEvent.target.name]: changeEvent.target.value
        });
    }

    handleSelectTab(key) {
        console.log('selected' + key);
        this.setState({keyTab: key});
    }
    
    render(){
        return(
            <div id="admin-container" className="conte">
                <header className="header">
                    <div className="header-presentacion-admin" >
                        <img
                            className="logor"
                            src={LogoUnimag}
                            alt="logo universidad del magdalena" />
                        <div>
                            <b>Administrador</b>
                            <p>PERIODO 2018 - 2022 </p>
                        </div>
                    </div>
                </header>
                <section className="section-tables" >
                    <Tabs
                        activeKey={this.state.keyTab}
                        selected={this.state.keyTab}
                        onSelect={this.handleSelectTab}
                        >
                        <Tab eventKey={0} label="Consejo Superior" >
                            <form className="containers-candidatos" >
                                {
                                    this.state.candidatos1 && this.state.candidatos1.map( (cur, key) => {
                                        return(
                                            <div className="candidato" >
                                                <img src={cur.foto} alt={cur.foto}/>
                                                <h3>{cur.nombre}</h3>
                                                <input
                                                    type="radio"
                                                    name="organo1"
                                                    value={cur.id}
                                                    checked={this.state.organo1 == cur.id}
                                                    onChange={this.handleOptionChange} 
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </form>
                        </Tab>
                        <Tab eventKey={1} label="Consejo Academico" >
                            <form className="containers-candidatos" >
                                {
                                    this.state.candidatos2 && this.state.candidatos2.map( (cur, key) => {
                                        return(
                                            <div className="candidato" >
                                                <img src={cur.foto} alt={cur.foto}/>
                                                <h3>{cur.nombre}</h3>
                                                <input
                                                    type="radio"
                                                    name="organo2"
                                                    value={cur.id}
                                                    checked={this.state.organo2 == cur.id}
                                                    onChange={this.handleOptionChange} 
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </form>
                        </Tab>
                        <Tab eventKey={2} label="CIARP" >
                            <form className="containers-candidatos" >
                                {
                                    this.state.candidatos3 && this.state.candidatos3.map( (cur, key) => {
                                        return(
                                            <div className="candidato" >
                                                <img src={cur.foto} alt={cur.foto}/>
                                                <h3>{cur.nombre}</h3>
                                                <input
                                                    type="radio"
                                                    name="organo3"
                                                    value={cur.id}
                                                    checked={this.state.organo3 == cur.id}
                                                    onChange={this.handleOptionChange} 
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </form>
                        </Tab>
                    </Tabs>
                </section>
                <footer className="footer">
                    <input type="button" defaultValue="Salir" onClick={
                        () => {
                            logout();
                            this.props.setCurrentUser({});
                            this.props.history.push('/');
                        }
                    } />
                    <input type="button" defaultValue="Votar" onClick={this.votar} />
                    <img className="pie" src={require('../../img/pie.png')} />
                </footer>
                <SweetAlert
                    show={this.state.alert}
                    title="Notificacion"
                    text={this.state.msgAlert}
                    onConfirm={() => {
                        this.setState({
                            alert: null
                        },() => {
                            if(this.state.votado){
                                logout();
                                this.props.setCurrentUser({});
                                this.props.history.push('/');
                            }
                        });
                    }}
                    onEscapeKey={() => this.setState({ alert: false })}
                    onOutsideClick={() => this.setState({ alert: false })}
                />
            </div>
        );
    }

    componentDidMount(){

        graphqlClient(`
            query{
                candidatos(organoId: 1){
                    id
                    nombre
                    numero
                    foto
                  }
            }
        `)
        .then( ({data}) => {
            this.setState({
                candidatos1: data.candidatos
            });
        })
        .catch( err => {
            alert(err);
        });
        graphqlClient(`
            query{
                candidatos(organoId: 2){
                    id
                    nombre
                    numero
                    foto
                  }
            }
        `)
        .then( ({data}) => {
            this.setState({
                candidatos2: data.candidatos
            });
        })
        .catch( err => {
            alert(err);
        });
        graphqlClient(`
            query{
                candidatos(organoId: 3){
                    id
                    nombre
                    numero
                    foto
                  }
            }
        `)
        .then( ({data}) => {
            this.setState({
                candidatos3: data.candidatos
            });
        })
        .catch( err => {
            alert(err);
        });
    }
}

function mapStateToProps(state){
    return {
        user: state.login.user
    }
}

export default connect(mapStateToProps, {setCurrentUser})(withRouter(Votante));