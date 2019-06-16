import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BloquePage.css';
import { cargarAsyncDatos } from '../../store/actions/datos';

class BloquePage extends Component {

    abortController = new AbortController();

    componentDidMount() {
        // Si no se ha cargado el state mandamos a cargarlo
        if ( !this.props.bloque ) {
            this.props.dispatch( cargarAsyncDatos(this.abortController) );
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {

        console.log(this.props);

        return (
            <div>
                <span> Bloque Page... { JSON.stringify(this.props.bloque) } </span>

                <br />
                <br />

                <span> Salones... { JSON.stringify(this.props.salones) } </span>
            </div>
        )
    }

}

function mapStateToProps(state, props) {
    // Obtenemos el id de la URL
    let search = props.location.search;
    let id = search.split('=')[1];

    console.log('search', search);
    console.log('id', id);

    // Obtenemos el bloque del id que está en la URL
    let bloque = undefined;

    let resBloques = state.bloques.filter( bloque => bloque.id.toString() === id);

    console.log('res bloques', resBloques);

    if ( resBloques.length > 0 ) bloque = resBloques[0];

    // Obtenemos los salones del bloque
    let resSalones = state.salones.filter( salon => salon.id_bloque.toString() === id );

    return {
        bloque: bloque,
        salones: resSalones
    }
}

export default connect(mapStateToProps)(BloquePage);