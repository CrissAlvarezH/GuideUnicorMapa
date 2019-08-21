import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './BloquePage.css';
import { cargarAsyncDatos } from '../../store/actions/datos';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SwipeImgs from '../../componentes/swipe-imgs/SwipeImgs';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import ItemSalon from '../../componentes/item-salon/ItemSalon';
import NavBarra from '../../componentes/nav-bar/NavBarra';

class BloquePage extends Component {

    estaMontado = false;

    componentDidMount() {
        this.estaMontado = true;

        // Si no se ha cargado el state mandamos a cargarlo
        if ( !this.props.bloque ) {
            this.props.dispatch( cargarAsyncDatos(this.estaMontado) );
        }

        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this.estaMontado = false;
    }

    render() {
        console.log(this.props);

        if ( !this.props.bloque ) return <span> Cargando bloque... </span>

        let claseColorChip = this.definirColorChip();

        return (
            <div className="BloquePage">
            
                <div className="cont-pagina-bloque">

                    <div className="cont-appbar-movil">
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton onClick={ e => this.props.history.goBack() } edge="start" style={{ marginRight: '5px' }} color="inherit" aria-label="Menu">
                                    <ArrowBackIcon />
                                </IconButton>

                                <Typography variant="h6">
                                    { 'Bloque '+this.props.bloque.codigo}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>

                    {
                        <SwipeImgs id={ this.props.bloque.id } />
                    }

                    <div className="cont-datos-bloque">

                        <Typography variant="h6">
                            { this.props.bloque.nombre}
                        </Typography>

                        <Chip 
                            className={ 'chip-zona ' + claseColorChip }
                            label={ 'Zona ' + this.definitLetraZona() } 
                            color={ 'primary' }
                        />

                    </div>

                    <div className="cont-lista-pisos">
                        <div className="lista-pisos">
                            {
                                this.props.bloque.pisos.map( piso => {

                                    return (
                                        <div className="cont-piso" key={piso.piso}>

                                            <Card>

                                                <div className="cont-cabecera-piso">

                                                    <Typography variant="body1">
                                                        Piso { piso.piso }
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        { piso.cantSalones } Salones
                                                    </Typography>

                                                </div>

                                                <hr />

                                                {
                                                    this.props.salones.map( salon => {

                                                        if ( salon.piso === piso.piso ) {

                                                            return (
                                                                <div style={{ padding: '0 10px' }} key={salon.id}>
                                                                    <ItemSalon  salon={salon} />    
                                                                </div>

                                                            );

                                                        } else {
                                                            return false;
                                                        }
                                                    })
                                                }

                                            </Card>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>

                </div>

            </div>
        )
    }

    definitLetraZona = () => {
        switch (this.props.bloque.idZona) {
            case '1':
                return 'A';
            case '2':
                return 'B';
            case '3':
                return 'C';
            case '4':
                return 'D';
            case '5':
                return 'E';
            default:
                return '';
        }
    }

    definirColorChip = () => {
        switch (this.props.bloque.idZona) {
            case '1':
                return 'fondo-verde';
            case '2':
                return 'fondo-azul';
            case '3':
                return 'fondo-rosa';
            case '4':
                return 'fondo-rojo';
            case '5':
                return 'fondo-amarillo';
            default:
                return '';
        }
    }

}

function mapStateToProps(state, props) {
    // Obtenemos el id de la URL
    let search = props.location.search;
    let id = search.split('=')[1];

    console.log('search', search);
    console.log('id', id);

    // Obtenemos el bloque del id que está en la URL
    let bloque = undefined;

    let resBloques = state.bloques.filter( bloque => bloque.id.toString() === id);

    console.log('res bloques', resBloques);

    if ( resBloques.length > 0 ) bloque = resBloques[0];

    // Obtenemos los salones del bloque
    let resSalones = state.salones.filter( salon => salon.id_bloque.toString() === id );

    return {
        bloque: bloque,
        salones: resSalones
    }
}

export default connect(mapStateToProps)(BloquePage);