import React, { Component } from 'react';
import './MapaPage.css';
import Mapa from '../../componentes/mapa/Mapa';
import { connect } from 'react-redux';

class MapaPage extends Component {


    render() {
        return (
            <div className="MapaPage">
    
                <Mapa bloques={ this.props.bloques }/>

            </div>
        );
    }

}

function mapStateToProsp(state, props) {
    return {
        bloques: state.bloques
    };
}

export default connect(mapStateToProsp)(MapaPage);