import React from 'react';
import LogoUnimag from '../../img/logo.png';
import graphqlClient from '../../utils/graphqlClient';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout, setCurrentUser } from '../../redux/actions/login';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import config from '../../config/default.json';
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
            organo3: ''
        }
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    componentWillMount(){
        this.props.setCurrentUser(localStorage.getItem(config.localStorageLogin));
    }

    handleOptionChange(changeEvent) {
        this.setState({
          [changeEvent.target.name]: changeEvent.target.value
        });
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
                    <Tabs style={{border:'2px solid green'}} headerStyle={{fontWeight: 'bold'}} activeHeaderStyle={{color:'blue'}} contentStyle={{backgroundColor:'lightgoldenrodyellow'}}>
                        <Tab label="Consejo Superior" >
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
                                                    value={cur.nombre}
                                                    checked={this.state.organo1 === cur.nombre}
                                                    onChange={this.handleOptionChange} 
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </form>
                        </Tab>
                        <Tab label="Consejo Academico" >
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
                                                    value={cur.nombre}
                                                    checked={this.state.organo2 === cur.nombre}
                                                    onChange={this.handleOptionChange} 
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </form>
                        </Tab>
                        <Tab label="CIARP" >
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
                                                    value={cur.nombre}
                                                    checked={this.state.organo3 === cur.nombre}
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
                    <img className="pie" src={require('../../img/pie.png')} />
                </footer>
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