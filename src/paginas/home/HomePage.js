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
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';

class HomePage extends Component {

    estaMontado = false;

    state = {
        indexPagina: 0,
        filtroBusqueda: '',
        bloquesFiltrados: [],
        salonesFiltrados: []
    }

    componentDidMount() {
        console.log('Propiedades de Home', this.props);

        // Seteamos el indice de la pagina dependiendo de la URL para que 
        // Se marquen el menú con el item correspondiente
        switch ( this.props.location.pathname ) {
            case '/mapa':
                this.setState( prevState => {
                    // Si selecciona el mismo no cambiamos
                    if ( prevState.indexPagina !== 0 ) {
                        return prevState.indexPagina = 0;
                    }
                });
                break;
            case '/bloques':
                this.setState( prevState => {
                    // Si selecciona el mismo no cambiamos
                    if ( prevState.indexPagina !== 1 ) {
                        return prevState.indexPagina = 1;
                    }
                });
        }

        this.estaMontado = true;

        if ( this.props.bloques.length === 0 )
            this.props.dispatch( cargarAsyncDatos(this.estaMontado) );
    }

    componentWillUnmount() {
        this.estaMontado = false;
    }

    render() {

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
    
                <Switch >
                    <Redirect exact from='/' to='/mapa'  />
                    <Route exact path='/bloques' component={BloquesPage} />
                    <Route path='/mapa' component={MapaPage} />
                </Switch>


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

        switch(value) {
            case 0:
                this.props.history.push('/mapa');
                break;
            case 1:
                this.props.history.push('/bloques');
                break;
        }

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