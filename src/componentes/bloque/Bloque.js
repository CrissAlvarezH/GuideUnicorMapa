import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import './Bloque.css';
import GridImgs from '../grid-imgs/GridImgs';

class Bloque extends Component {

    render() {

        let claseColorChip = this.definirColorChip();

        return (
            <div className="cont-card-bloque">
                <Card className="card-bloque">

                    <div className="cont-imgs">
                        <GridImgs id={ this.props.datos.codigo } />

                        <span> { this.props.datos.codigo } </span>
                    </div>

                    <CardContent>
                        
                        <Typography variant="body2" color="textPrimary" component="p">
                            { this.props.datos.nombre } 
                        </Typography>


                        <div className="cont-salones-zona">
                            <div className="salones">
                                <Typography  variant="body2" color="textSecondary" component="p">
                                    { this.props.datos.salones.length } Salones
                                </Typography>
                            </div>

                         
                            <Chip 
                                className={ 'chip-zona ' + claseColorChip }
                                label={ 'Zona ' + this.definitLetraZona() } 
                                color={ 'primary' }/>

                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    definitLetraZona = () => {
        switch (this.props.datos.idZona) {
            case 1:
                return 'A';
            case 2:
                return 'B';
            case 3:
                return 'C';
            case 4:
                return 'D';
            case 5:
                return 'E';
            default:
                return '';
        }
    }

    definirColorChip = () => {
        switch (this.props.datos.idZona) {
            case 1:
                return 'fondo-verde';
            case 2:
                return 'fondo-azul';
            case 3:
                return 'fondo-rosa';
            case 4:
                return 'fondo-rojo';
            case 5:
                return 'fondo-amarillo';
            default:
                return '';
        }
    }

}

export default Bloque;