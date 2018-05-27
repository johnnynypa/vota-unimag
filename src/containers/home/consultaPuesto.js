import React, {Component} from 'react';
import graphqlClient from '../../utils/graphqlClient';

class Consulta extends Component{

    constructor(props){
        super(props);

        this.searchByCodigo = this.searchByCodigo.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            buscado: {},
            codigo: ""
        }
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
                    nombre
                    nombre2
                    apellido
                    apellido2
                    mesa{
                        numero
                        lugar{
                            nombre
                        }
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

    render(){
        const {buscado} = this.state; 
        return(
            <div>
                <strong>Busqueda por codigo</strong>
                <input
                    type="text" placeholder="Codigo"
                    name="codigo" value={this.state.codigo}
                    onChange={this.onChange}
                    />
                <button onClick={this.searchByCodigo} >Buscar</button>
                <br/>
                <br/>
                { (buscado.nombre) ?
                    (
                        <div>
                            <p>
                                {
                                    `${buscado.nombre} ${(buscado.nombre2) ? buscado.nombre2:'' } ${buscado.apellido} ${buscado.apellido2}`
                                }
                            </p>
                            <h1>
                                {
                                    `Mesa Numero ${buscado.mesa.numero}`
                                }
                            </h1>
                            <h1>
                                {
                                    `Lugar: ${buscado.mesa.lugar.nombre}`
                                }
                            </h1>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default Consulta;