import React, { Component } from 'react';
import './MapaPage.css';
import Mapa from '../../componentes/mapa/Mapa';

class MapaPage extends Component {


    render() {
        return (
            <div className="MapaPage">
    
                <Mapa bloques={ this.props.bloques }/>

            </div>
        );
    }

}

export default MapaPage;