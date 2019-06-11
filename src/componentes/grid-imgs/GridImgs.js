import React, { Component } from 'react';
import './GridImgs.css';

class GridImgs extends Component {

    urlImg1 = `http://142.93.71.94/imagenes_unicor/bloques/${ this.props.id }/1.jpg`;
    urlImg2 = `http://142.93.71.94/imagenes_unicor/bloques/${ this.props.id }/2.jpg`;
    urlImg3 = `http://142.93.71.94/imagenes_unicor/bloques/${ this.props.id }/3.jpg`;

    render() {
        return (

            <div className="card-bloque-img">

                <img className="img1" src={ this.urlImg1 } alt={`Imagen 1 bloque ${ this.props.id }`}/>
                <img className="img2" src={ this.urlImg2 } alt={`Imagen 2 bloque ${ this.props.id }`}/>
                <img className="img3" src={ this.urlImg3 } alt={`Imagen 3 bloque ${ this.props.id }`}/>

            </div>
        );
    }

}

export default GridImgs;