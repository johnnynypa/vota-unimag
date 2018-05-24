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
// import '../todos.css';

class Admin extends Component {
    render() {
        if(this.props.isLogin)
        return (
            <div className="grid-container">
                <div className="item1">
                    <div className="grid-container-ban">
                        <div className="pa1">
                            <img
                                id="logoelectoral"
                                src={LogoUnimag}
                                alt="logo universidad del magdalena" />
                        </div>
                        <div className="pa2">
                            <br />
                            <b>MODULO ADMINISTRADOR </b>
                            <br /> ELECCIONES 2018
                            <div className="pa3">
                                <input
                                    className="input"
                                    type="button"
                                    defaultValue="Salir"
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
                        <div className="tab">
                            <button
                                className="tablinks"> General </button>
                            <button
                                className="tablinks"> Programas</button>
                            <button
                                className="tablinks"> Proximo</button>
                        </div>
                    </div>
                    <div className="item2">
                        
                        <TablaUsuarios/>
                        <TablaPrograma />
                        <TablaMesas />
                    </div>
                    <div className="item5">
                        <img
                            className="foot"
                            src={FooterImage}
                            alt="universidad del magdalena" />
                        <img
                            className="foot"
                            src={UnaUni}
                            alt="universidad del magdalena" />
                    </div>
                </div>
            </div>
        )
        else{
            this.props.history.push('/');
            return (<div></div>)
        }
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