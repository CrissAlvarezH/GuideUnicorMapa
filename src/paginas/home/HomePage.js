import React, { Component } from 'react';
import './HomePage.css';
// Materia UI
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MapaPage from '../mapa/MapaPage';
import BloquesPage from '../bloques/BloquesPage';
import SplashPage from '../splash/SplashPage';
import BarraBuscar from '../../componentes/barra-buscar/BarraBuscar';
import ResBusqueda from '../../componentes/res-busqueda/ResBusqueda';

class HomePage extends Component {

    abortController = new AbortController();

    state = {
        indexBottonNav: 0,
        filtroBusqueda: '',
        bloques: [],
        salones: [],
        bloquesFiltrados: [],
        salonesFiltrados: [],
        cargandoInfo: true,
        errorCarga: ''
    }

    componentDidMount() {
        this.cargarBloques();
    }

    componentWillUnmount() {
        this.abortController.abort(); // Abortamos la peticion que sigan en proceso al desmontarsea
    }

    render() {

        let page = <SplashPage />

        if ( !this.state.cargandoInfo ) { // Si no está cargando: Tab 0 = Mapa, 1 = Bloques
            page = this.state.indexBottonNav === 0 ? <MapaPage bloques={ this.state.bloques } /> : <BloquesPage bloques={ this.state.bloques } />;
        }

        return (
            <div className="HomePage">

                <BarraBuscar onBuscar={ this.onBuscar } />

                {
                    this.state.filtroBusqueda !== '' && <div className="cont-res-busqueda"> <ResBusqueda bloques={ this.state.bloquesFiltrados } salones={ this.state.salonesFiltrados } /> </div>
                }
    
        
                {
                    page
                }
          
           
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

    onBuscar = (event) => {
        let filtro = event.target.value;

        this.setState({
            filtroBusqueda: filtro
        });

        let bloques = this.state.bloques.filter( bloque => {
            let nombre = bloque.nombre.toLowerCase();
            let codigo = bloque.codigo.toString().toLowerCase();
            filtro = filtro.toLowerCase();

            if ( nombre.includes(filtro) || codigo.includes(filtro) ) {
                return bloque;
            }
        });

        let salones = this.state.salones.filter( salon => {
            let nombre = salon.nombre.toLowerCase();
            let codigo = salon.codigo.toLowerCase();
            filtro = filtro.toLowerCase();

            if ( nombre.includes(filtro) || codigo.includes(filtro) ) {
                return salon;
            }
        });

        this.setState({
            bloquesFiltrados: bloques,
            salonesFiltrados: salones
        });

    }

    cargarBloques = () => {

        fetch('http://142.93.71.94:4400/bloques/info-bloques', { signal: this.abortController.signal })
            .then( resp => resp.json() )
            .then( data => {
                console.log('Respuesta server: ', data);

                if ( data.okay ) {

                    this.setState({
                        cargandoInfo: false,
                        bloques: data.info.bloques,
                        salones: data.info.salones,
                        salonesFiltrados: [],
                        bloquesFiltrados: [],
                        errorCarga: ''
                    });

                } else {
                    console.log('Error respuesta server: ', data.error);

                    this.setState({
                        cargandoInfo: false,
                        bloques: [],
                        salones: [],
                        salonesFiltrados: [],
                        bloquesFiltrados: [],
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