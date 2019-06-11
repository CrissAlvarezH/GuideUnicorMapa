import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './BarraBuscar.css';
import { InputBase } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

class BarraBuscar extends Component {
    
    render() {
        return (
            <div className="BarraBuscar">

                <Icon className="icono-buscar" color="disabled"> search </Icon>

                <InputBase
                    className="input-buscar"
                    placeholder="Buscar bloques y salones..."
                />

            </div>
        );
    }

}

export default BarraBuscar;