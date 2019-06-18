import React, { Component } from 'react';
import './ItemSalon.css';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

class ItemSalon extends Component {

    render() {
        return (
            <div 
                onClick={ e => this.props.onClickBusqueda(this.props.salon.id_bloque) }
                className="cont-item-salon" 
            >

                <div className="item-salon">
                    <Chip
                        className="chip-cod-salon"
                        label={ this.props.salon.codigo }
                        color="primary"
                    />

                    <Typography  variant="body1" color="textPrimary" component="p">
                        { this.props.salon.nombre }
                    </Typography>
                </div>

                <Divider />
            </div>
        );
    }

}

export default ItemSalon;