import React, { Component } from 'react';
import './GridImgs.css';

class GridImgs extends Component {

    rutaImg1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREpSofzVas-SmYs5WLZXU9Yk7Ohr3QHiptH1eQddrGU-DRNLab";
    rutaImg2 = "https://i.ytimg.com/vi/frMXIq2UvYM/maxresdefault.jpg";
    rutaImg3 = "https://i.blogs.es/f0b8ef/01/450_1000.jpg";

    render() {
        return (

            <div className="card-bloque-img">

                <img className="img1" src={ this.rutaImg1 } alt='Imagen bloque 1'/>
                <img className="img2" src={ this.rutaImg2 } alt='Imagen bloque 1'/>
                <img className="img3" src={ this.rutaImg3 } alt='Imagen bloque 1'/>

            </div>
        );
    }

}

export default GridImgs;