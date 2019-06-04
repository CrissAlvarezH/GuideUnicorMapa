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
                        <GridImgs />

                        <span> { this.props.datos.codigo } </span>
                    </div>

                    <CardContent>
                        
                        <Typography variant="body2" color="textPrimary" component="p">
                            { this.props.datos.nombre } 
                        </Typography>


                        <div className="cont-salones-zona">
                            <div className="salones">
                                <Typography  variant="body2" color="textSecondary" component="p">
                                    { this.props.datos.cantSalones } Salones
                                </Typography>
                            </div>

                         
                            <Chip 
                                className={ 'chip-zona ' + claseColorChip }
                                label={ 'Zona ' + this.props.datos.zona } 
                                color={ 'primary' }/>

                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    definirColorChip = () => {
        switch (this.props.datos.zona) {
            case 'A':
                return 'fondo-verde';
            case 'B':
                return 'fondo-azul';
            case 'C':
                return 'fondo-rosa';
            case 'D':
                return 'fondo-rojo';
            case 'E':
                return 'fondo-amarillo';
        }
    }

}

export default Bloque;