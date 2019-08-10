import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import './ResBusqueda.css';
import ItemSalon from '../item-salon/ItemSalon';

class ResBusqueda extends Component {

    render() {

        let { bloques, salones } = this.props;

        return (
            <div className="ResBusqueda">

                {
                    bloques.length === 0 && salones.length === 0 && <Typography  variant="body1" color="textSecondary" component="p"> No hay coincidencias </Typography>
                }

                <div className="cont-resultado">
                    <div className="cont-bloques">

                        {
                            bloques.length > 0 && <div> <Typography  variant="body1" color="textPrimary" component="p"> Bloques </Typography> <hr /> </div>
                        }
                        
                        {
                            this.listBloques(bloques)
                        }
                        
                    </div>

                    <div className="cont-salones">

                        {
                            salones.length > 0 && <div> <Typography  variant="body1" color="textPrimary" component="p"> Salones </Typography> <hr /> </div>
                        }

                        {
                            this.listaSalones(salones)
                        }

                    </div>
                </div>

            </div>
        );
    }

    listBloques = (bloques) => {

        return bloques.map( bloque => {

            return (
                <div 
                    onClick={ e => this.props.onClickBusqueda(bloque.id) }
                    className="cont-item-bloque" 
                    key={ bloque.id }
                >

                    <div className="item-bloque">
                        <Chip
                            className="chip-cod-bloque"
                            label={ bloque.codigo }
                            variant="outlined"
                            color="primary"
                        />

                        <Typography  variant="body1" color="textPrimary" component="p">
                            { bloque.nombre }
                        </Typography>
                    </div>

                    <Divider />
                </div>
            );

        }); 
    }

    listaSalones = (salones) => {
        return salones.map( salon => {

            return <ItemSalon 
                        onClickBusqueda = { this.props.onClickBusqueda }
                        salon={ salon }
                        key={ salon.id }
                    />
        })
    }

    

}

export default ResBusqueda;