import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { InputBase } from '@material-ui/core';
import './NavBarra.css';

class NavBarra extends Component {

    render() {
        return (
            <div className="cont-nav" >

                <div className="cont-menu-nav">

                    <div className="cont-titulo-nav">
                        <Typography variant="h6">
                            Ubicor
                        </Typography>
                    </div>


                    <div className="cont-buscar-nav">
                        <Icon className="icono-buscar" color="disabled"> search </Icon>

                        <InputBase
                            onChange={ this.props.onBuscar }
                            className="input-buscar"
                            placeholder="Buscar bloques y salones..."
                        />
                    </div>

                    <div className= { "cont-item-mapa " + (this.props.indexPagina == 0 ? "seleccionado" : "") }>
                        <Button
                            onClick={ (e) => this.props.onChangePagina(0) }
                            >Mapa</Button>
                    </div>

                    <div className= { "cont-item-bloques " + (this.props.indexPagina == 1 ? "seleccionado" : "") } >
                        <Button
                            onClick={ (e) => this.props.onChangePagina(1) }
                            >Bloques</Button>
                    </div>
                </div>
            </div>
        );
    }

}

export default NavBarra;