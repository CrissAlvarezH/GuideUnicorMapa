import React, { Component } from 'react';
import './BloquesPage.css';
import Bloque from '../../componentes/bloque/Bloque';

class BloquesPage extends Component {

    render() {
        return (
            <div className="BloquesPage">
                <div className="cont-lista-bloques">
                    <div className="lista-bloques">
                        {
                            this.props.bloques.map( bloque => <Bloque datos={bloque} key={bloque.id} /> )
                        }
                    </div>
                </div>  
            </div>
        );
    }

}

export default BloquesPage;