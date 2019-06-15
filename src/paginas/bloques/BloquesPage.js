import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BloquesPage.css';
import Bloque from '../../componentes/bloque/Bloque';

class BloquesPage extends Component {

    render() {
        return (
            <div className="BloquesPage">
                <div className="cont-lista-bloques">
                    <div className="lista-bloques">
                        {
                            this.props.bloques.map( bloque => (
                                <Link 
                                    to={{
                                        pathname: '/bloques',
                                        search: `?id=${bloque.codigo}`,
                                        state: {
                                            bloque
                                        }
                                    }} 
                                    key={bloque.id} 
                                >
                                    <Bloque datos={bloque}  /> 
                                </Link>
                            ))
                        }
                    </div>
                </div>  
            </div>
        );
    }

}

export default BloquesPage;