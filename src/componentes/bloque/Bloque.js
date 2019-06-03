import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Bloque.css';
import GridImgs from '../grid-imgs/GridImgs';

class Bloque extends Component {

    render() {
        return (
            <div className="cont-card-bloque">
                <Card className="card-bloque">
                    <GridImgs />

                    <CardContent>
                        <Typography variant="body2" color="textPrimary" component="p">
                            { this.props.datos.nombre } 
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                            { this.props.datos.cantSalones } Salones
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }

}

export default Bloque;