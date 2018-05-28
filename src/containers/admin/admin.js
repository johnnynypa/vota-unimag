import React, { Component } from 'react';
import LogoUnimag from '../../img/logo.png';
import FooterImage from '../../img/foot.png';
import UnaUni from '../../img/una-universidad.png';
import { withRouter } from 'react-router';
import { logout, setCurrentUser } from '../../redux/actions/login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TablaPrograma from './tablePrograma';
import TablaUsuarios from './tableUsuarios';
import TablaMesas from './tablaMesa';
import './admin.css';
import '../todos.css';

class Admin extends Component {

    constructor(props){
        super(props);

        this.state = {
            showTable : 1
        }
    }

    render() {
        // if (this.props.isLogin)
            var TablaRender = TablaUsuarios;
            switch (this.state.showTable){
                case 1:{
                    TablaRender = TablaUsuarios;
                    break;
                }
                case 2:{
                    TablaRender = TablaPrograma;
                    break;
                }
                case 3:{
                    TablaRender = TablaMesas;
                    break;
                }
            }
            return (
                <div className="conte">
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
                        <div className="tab">
                            <input
                                type="button"
                                className="tablinks"
                                defaultValue="Usuarios" 
                                onClick={ () => {
                                    this.setState({showTable: 1});
                                }}
                                />
                            <input
                                type="button"
                                className="tablinks"
                                defaultValue="Programas"
                                onClick={ () => {
                                    this.setState({showTable: 2});
                                }}
                                />
                            <input
                                type="button"
                                className="tablinks"
                                defaultValue="Mesas"
                                onClick={ () => {
                                    this.setState({showTable: 3});
                                }}
                                />
                        </div>
                    </header>
                    <section className="section-tables" >
                        <TablaRender />
                    </section>
                    <footer className="footer">
                        <input
                            type="button"
                            defaultValue="Estadisticas"
                            />
                        <input type="button" defaultValue="Salir" />
                        <img className="pie" src={require('../../img/pie.png')} />
                    </footer>
                </div>

            )
        // else {
        //     this.props.history.push('/');
        //     return (<div></div>)
        // }
    }
}

Admin.propsTypes = {
    setCurrentUser: PropTypes.func.isRequerid,
}

function mapStateToProps(state) {
    return {
        isLogin: state.login.isLogin,
    }
}

export default connect(mapStateToProps, { setCurrentUser })(withRouter(Admin));