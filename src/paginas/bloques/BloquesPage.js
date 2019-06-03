import React, { Component } from 'react';
import './BloquesPage.css';
import Bloque from '../../componentes/bloque/Bloque';

class BloquesPage extends Component {

    bloques = [
        {
            'id': 1,
            'codigo': 1,
            'nombre': 'Bloque numero 1',
            'cantSalones': 13
        },
        {
            'id': 2,
            'codigo': 2,
            'nombre': 'Bloque numero 2',
            'cantSalones': 10
        },
        {
            'id': 3,
            'codigo': 3,
            'nombre': 'Bloque numero 3',
            'cantSalones': 7
        },
        {
            'id': 4,
            'codigo': 4,
            'nombre': 'Bloque numero 4',
            'cantSalones': 5
        },
        {
            'id': 5,
            'codigo': 4,
            'nombre': 'Bloque numero 4',
            'cantSalones': 5
        },
        {
            'id': 6,
            'codigo': 4,
            'nombre': 'Bloque numero 4',
            'cantSalones': 5
        }
    ];

    render() {
        return (
            <div className="BloquesPage">
                <div className="cont-lista-bloques">
                    {
                        this.bloques.map( bloque => <Bloque datos={bloque} key={bloque.id} /> )
                    }
                </div>
            </div>
        );
    }

}

export default BloquesPage;