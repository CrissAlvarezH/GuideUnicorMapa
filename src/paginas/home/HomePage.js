import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cargarAsyncDatos } from '../../store/actions/datos';
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
        bloquesFiltrados: [],
        salonesFiltrados: []
    }

    componentDidMount() {
        if ( this.props.bloques.length === 0 )
            this.props.dispatch( cargarAsyncDatos(this.abortController) );
    }

    componentWillUnmount() {
        this.abortController.abort(); // Abortamos la peticion que sigan en proceso al desmontarsea
    }

    render() {

        let page = <SplashPage />

        if ( !this.props.cargandoInfo ) { // Si no está cargando: Tab 0 = Mapa, 1 = Bloques
            page = this.state.indexBottonNav === 0 ? <MapaPage /> : <BloquesPage />;
        }

        return (
            <div className="HomePage">

                <BarraBuscar 
                    onBuscar={ this.onBuscar } 
                />

                {
                    this.state.filtroBusqueda !== '' && (
                        <div className="cont-res-busqueda"> 
                            <ResBusqueda 
                                bloques={ this.state.bloquesFiltrados } 
                                salones={ this.state.salonesFiltrados } 
                                onClickBusqueda={ this.onClickBusqueda }
                            /> 
                        </div>
                    )
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

        let bloques = this.props.bloques.filter( bloque => {
            let nombre = bloque.nombre.toLowerCase();
            let codigo = bloque.codigo.toString().toLowerCase();
            filtro = filtro.toLowerCase();

            if ( nombre.includes(filtro) || codigo.includes(filtro) ) {
                return bloque;
            } else {
                return false;
            }
        });

        let salones = this.props.salones.filter( salon => {
            let nombre = salon.nombre.toLowerCase();
            let codigo = salon.codigo.toLowerCase();
            filtro = filtro.toLowerCase();

            if ( nombre.includes(filtro) || codigo.includes(filtro) ) {
                return salon;
            } else {
                return false;
            }
        });

        this.setState({
            bloquesFiltrados: bloques,
            salonesFiltrados: salones
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

    onClickBusqueda = (idBloque) => {
        console.log('Id bloque a buscar',  idBloque);
        console.log(this.props);

        this.props.history.push(`/bloques?id=${ idBloque }`);
    }
}

function mapStateToProps(state, props) {
    return {
        cargandoInfo: state.cargandoBloques,
        bloques: state.bloques,
        salones: state.salones
    }
}

export default connect(mapStateToProps)(HomePage);