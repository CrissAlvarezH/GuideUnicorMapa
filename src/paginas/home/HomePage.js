import React, { Component } from 'react';
import './HomePage.css';
import Mapa from '../../componentes/mapa/Mapa';
// Materia UI
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MapaPage from '../mapa/MapaPage';
import BloquesPage from '../bloques/BloquesPage';

class HomePage extends Component {

    state = {
        indexBottonNav: 0
    }

    clickBottomNav = (value) => {

        this.setState( prevState => {
            // Si selecciona el mismo no cambiamos
            if ( prevState.indexBottonNav != value ) {
                return prevState.indexBottonNav = value;
            }
        });
    }

    render() {
        return (
            <div className="HomePage">
    
                <div className="home-page-mapa">
                    {
                        // Tab 0 = Mapa, 1 = Bloques
                        this.state.indexBottonNav == 0 ? <MapaPage /> : <BloquesPage />
                    }
                </div>

                <BottomNavigation 
                    value={ this.state.indexBottonNav }
                    onChange={(event, newValue) => {
                        this.clickBottomNav(newValue);
                    }}
                    showLabels
                >

                    <BottomNavigationAction label="Mapa" />
                    <BottomNavigationAction label="Bloques" />

                </BottomNavigation>

            </div>
        );
    }

}

export default HomePage;