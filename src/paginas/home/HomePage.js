import React, { Component } from 'react';
import './HomePage.css';
// Materia UI
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MapaPage from '../mapa/MapaPage';
import BloquesPage from '../bloques/BloquesPage';
import SplashPage from '../splash/SplashPage';

class HomePage extends Component {

    state = {
        indexBottonNav: 0,
        bloques: [],
        cargandoInfo: false,
        errorCarga: ''
    }

    componentDidMount() {
        this.cargarBloques();
    }

    render() {

        let page = <SplashPage />

        if ( !this.state.cargandoInfo ) { // Si no está cargando: Tab 0 = Mapa, 1 = Bloques
            page = this.state.indexBottonNav === 0 ? <MapaPage bloques={ this.state.bloques } /> : <BloquesPage bloques={ this.state.bloques } />;
        }

        return (
            <div className="HomePage">
    
                <div className="home-page-mapa">
                    {
                        page
                    }
                </div>

                
                <BottomNavigation 
                    className="home-bottom-nav"
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

    cargarBloques = () => {

        this.setState({
            cargandoInfo: true
        });

        fetch('http://142.93.71.94:4400/bloques/info-bloques')
            .then( resp => resp.json() )
            .then( data => {
                console.log('Respuesta server: ', data);

                if ( data.okay ) {

                    this.setState({
                        cargandoInfo: false,
                        bloques: data.bloques,
                        errorCarga: ''
                    });

                } else {
                    console.log('Error respuesta server: ', data.error);

                    this.setState({
                        cargandoInfo: false,
                        bloques: [],
                        error: 'No se pudo cargar la pagina'
                    })
                }
            })
            .catch( error => {
                console.log('Error respuesta server: ', error);

                this.setState({
                    cargandoInfo: false,
                    error: 'No se pudo cargar la pagina'
                })
            });
    }

    clickBottomNav = (value) => {

        this.setState( prevState => {
            // Si selecciona el mismo no cambiamos
            if ( prevState.indexBottonNav !== value ) {
                return prevState.indexBottonNav = value;
            }
        });
    }
}

export default HomePage;