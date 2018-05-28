import React, {Component} from 'react';
import LogoBlack from "../../img/logoo.png";
import PieImage from "../../img/pie.png";
import { withRouter } from 'react-router';
import { loginRequest, setCurrentUser} from '../../redux/actions/login';
import Modal from 'react-modal';
import Consulta from './consultaPuesto';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { rolRoute } from '../../utils/validations';
import './style.css';
import '../todos.css';

class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            dni : "",
            psw : "",
            isLoading : false,
            errors: "",
            isVisibleModal: false,
        }

        this.onSend  = this.onSend.bind(this);
        this.onChange  = this.onChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(id) {
        this.setState({ isVisibleModal: true, idUserEdit:id });
    }
    closeModal() {
        this.setState({ isVisibleModal: false });
    }

    onSend(e){
        e.preventDefault();
        const {dni, psw } = this.state;
        this.setState({isLoading:true, errors: "" });
        if(dni && psw){
			loginRequest({dni: dni, password: psw})
			.then(
				(res) => {
					if(res.error){
                        alert(res.error);
						this.setState({errors: res.error});
					}else{
                        this.props.setCurrentUser(res.token);
                        rolRoute(this.props.user)
                        .then( rout => {
                            this.props.history.push(rout);
                        })
					}	
				}
            )
            .catch( err => {
                this.setState({
                    errors: "Ha ocurrido un error al intentar conectarte, revisa tu conexion a internet o intentalo mas tarde"
                })
            })
        }else{
            this.setState({errors: "Rellene todos los campos por favor"})
        }
        this.setState({isLoading: false})
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    render(){
        return(
            <div className="contenedor-form">
                <img className="" src={LogoBlack} alt="Logo UniMagdalena" />
                <div className="formulario" >
                    <h1>Iniciar Sesión Jurado | Votante</h1>
                    <br/>
                    <form className="login">
                        <input onChange={this.onChange} type="text" placeholder="Numero de cedula" name="dni" value={this.state.dni} />
                        <input onChange={this.onChange} type="password" placeholder="Contraseña" name="psw"  value={this.state.psw} />
                        <input type="submit" value="Iniciar Sesión" className="btn_send" onClick={this.onSend} />
                    </form>
                    <input type="button" value="Estadisticas" />
                    <input onClick={this.openModal} type="button" value="Consultar puesto" />
                </div>
                <img className="pie" src={PieImage} alt="" />
                <Modal
                    isOpen={this.state.isVisibleModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Editar Usuario"
                >
                    <Consulta />
                </Modal>
            </div>
        )
    }
}

Home.propsTypes ={
    setCurrentUser: PropTypes.func.isRequerid
}

function mapStateToProps(state){
    return{
        isLogin : state.login.isLogin,
        user: state.login.user
    }
}

export default connect(mapStateToProps, {setCurrentUser})(withRouter(Home));