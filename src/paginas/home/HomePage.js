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
import NavBarra from '../../componentes/nav-bar/NavBarra';

class HomePage extends Component {

    estaMontado = false;

    state = {
        indexPagina: 0,
        filtroBusqueda: '',
        bloquesFiltrados: [],
        salonesFiltrados: []
    }

    componentDidMount() {
        this.estaMontado = true;

        if ( this.props.bloques.length === 0 )
            this.props.dispatch( cargarAsyncDatos(this.estaMontado) );
    }

    componentWillUnmount() {
        this.estaMontado = false;
    }

    render() {

        let page = <SplashPage />

        if ( !this.props.cargandoInfo ) { // Si no está cargando: Tab 0 = Mapa, 1 = Bloques
            page = this.state.indexPagina === 0 ? <MapaPage /> : <BloquesPage />;
        }

        // TODO terminar de hacer el responsive

        return (
            <div className="HomePage">
                
                <div className="nav-barra-escritorio">
                    <NavBarra 
                        indexPagina = { this.state.indexPagina }
                        onChangePagina = { (nuevoIndex) => {
                            this.changeIndexPagina(nuevoIndex);
                        }}
                        onBuscar = { this.onBuscar }
                    />
                </div>

                <div className="barra-busqueda-movil">
                    <BarraBuscar
                        onBuscar={ this.onBuscar } 
                        />
                </div>

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
          
                <div className="cont-home-bottom-nav">
                    <BottomNavigation 
                        className="home-bottom-nav"
                        value={ this.state.indexPagina }
                        onChange={(event, newValue) => {
                            this.changeIndexPagina(newValue);
                        }}
                        showLabels
                    >

                        <BottomNavigationAction label="Mapa" />
                        <BottomNavigationAction label="Bloques" />

                    </BottomNavigation>
                </div>

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

    changeIndexPagina = (value) => {

        this.setState( prevState => {
            // Si selecciona el mismo no cambiamos
            if ( prevState.indexPagina !== value ) {
                return prevState.indexPagina = value;
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