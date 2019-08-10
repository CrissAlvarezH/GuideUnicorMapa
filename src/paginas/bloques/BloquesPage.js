import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
                                        pathname: '/bloque',
                                        search: `?id=${bloque.id}`     
                                    }}
                                    style={{ textDecoration: 'none' }}
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

function mapStateToProps(state, props) {
    return {
        bloques: state.bloques
    }
}

export default connect(mapStateToProps)(BloquesPage);