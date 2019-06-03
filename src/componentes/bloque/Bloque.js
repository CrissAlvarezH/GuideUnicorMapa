import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Bloque.css';

class Bloque extends Component {

    rutaImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREpSofzVas-SmYs5WLZXU9Yk7Ohr3QHiptH1eQddrGU-DRNLab";

    render() {
        return (
            <div className="cont-card-bloque">
                <Card className="card-bloque">
                    <CardMedia
                        className="card-bloque-img"
                        image={ this.rutaImg }
                        title="Paella dish"
                    />

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