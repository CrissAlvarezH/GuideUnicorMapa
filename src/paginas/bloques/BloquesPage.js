import React, { Component } from 'react';
import './BloquesPage.css';
import Bloque from '../../componentes/bloque/Bloque';

class BloquesPage extends Component {

    bloques = [
        {
            'id': 1,
            'codigo': 1,
            'nombre': 'Bloque numero 1',
            'cantSalones': 13,
            'zona': 'A'
        },
        {
            'id': 2,
            'codigo': 2,
            'nombre': 'Bloque numero 2',
            'cantSalones': 10,
            'zona': 'A'
        },
        {
            'id': 3,
            'codigo': 3,
            'nombre': 'Bloque numero 3',
            'cantSalones': 7,
            'zona': 'B'
        },
        {
            'id': 4,
            'codigo': 4,
            'nombre': 'Bloque numero 4',
            'cantSalones': 5,
            'zona': 'C'
        },
        {
            'id': 5,
            'codigo': 5,
            'nombre': 'Bloque numero 5',
            'cantSalones': 5,
            'zona': 'D'
        },
        {
            'id': 6,
            'codigo': 6,
            'nombre': 'Bloque numero 6',
            'cantSalones': 5,
            'zona': 'E'
        }
    ];

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